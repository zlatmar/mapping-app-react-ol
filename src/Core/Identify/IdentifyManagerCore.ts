import { IIdentifyManager } from "./interfaces/IIdentifyManager";
import IAppMap from "../Map/interfaces/IAppMap";
import ILayer from "../Layers/interfaces/ILayer";
import ILayersManager from "../Layers/interfaces/ILayersManagerCore";
import { MapServiceTypes } from "../../Configuration/MapServiceTypes";
import ImageArcGISRest from "ol/source/ImageArcGISRest";
import axios from "axios";
import { ImageWMS } from "ol/source";
import VectorSource from "ol/source/Vector";
import { arcgisRestLoader } from "../Layers/LayerUtils";
import EsriJSON from "ol/format/EsriJSON";


export default class IdentifyManagerCore implements IIdentifyManager {
    private _isActive: boolean = false;
    private _map: IAppMap;
    private _layersManager: ILayersManager;

    constructor(map: IAppMap, layerManager: ILayersManager) {
        this._map = map;
        this._layersManager = layerManager;
    }

    activate = (): void => {
        this._isActive = true;
        this._map.on("click", this.mapClick);
    }

    deactivate = (): void => {
        this._isActive = false;
        this._map.un("click", this.mapClick);
    }

    isActive = (): boolean => {
        return this._isActive;
    }

    mapClick = (evt: any): void => {
        const layers = this._layersManager.getMapLayers();
        const coordinates = evt.coordinate;
        console.log(layers)
        layers.forEach(l => {
            this.identify(l, coordinates);
        })

    }

    showPopUp(): void {
        throw new Error("Method not implemented.");
    }

    private identify = async (layer: ILayer, coordinates: [number, number]) => {
        console.log(layer.type)
        try {
            if (layer.type === MapServiceTypes.ARCGIS_MAP_SERVICE) {
            const layerSource = layer.getSource() as ImageArcGISRest;
            const url = layerSource?.getUrl();
            const result = await axios.get(`${url}?f=json`)
            const targetLayersInfo = result.data.layers;
            targetLayersInfo.forEach((layerInfo: any) => {
                const params = {
                    geometry: JSON.stringify({
                        x: coordinates[0],
                        y: coordinates[1]
                    }),
                    geometryType: "esriGeometryPoint",
                    inSR: 3857,
                    spatialRel: "esriSpatialRelIntersects",
                    outFields: ["*"],
                    f: "json"
                };
                const queryResult = axios.post(`${url}/${layerInfo.id}/query`, params, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                console.log(queryResult);
            });
            }
            else if (layer.type === MapServiceTypes.WMS) {
                const layerSource = layer.getSource() as ImageWMS;
                const url = layerSource.getFeatureInfoUrl(coordinates, this._map.getView().getResolution() as number, "EPSG:3857", {'INFO_FORMAT': 'text/plain'},)
                if (url) {
                    const result = await axios.get(url);
                    console.log(result.data)
                }
            }
            else if (layer.type === MapServiceTypes.ARCGIS_FEATURE_SERVICE) {
                console.log(MapServiceTypes.ARCGIS_FEATURE_SERVICE)
                const layerSource = layer.getSource() as VectorSource;
                const url = layerSource.getUrl() as string;
                const esrijsonFormat = new EsriJSON();
                
                const extent = [coordinates[0], coordinates[1], coordinates[0], coordinates[1]];
                // const geometry = 
                const result = await arcgisRestLoader({extent, resolution: 0, projection: this._map.getView().getProjection(), layerUrl: url, esrijsonFormat});
                console.log(result);
            }
        } catch (error) {
            console.error(error)
        }
    }
}
