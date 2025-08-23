import axios from "axios";
import IAppMap from "../../Domain/Map/interfaces/IAppMap";
import ImageCoreLayer from "./LayerTypes/ImageCoreLayer";
import VectorCoreLayer from "./LayerTypes/VectorCoreLayer";
import ILayersManagerCore from "../../Domain/Layers/interfaces/ILayersManagerCore";

// mapping library
import { createXYZ } from "ol/tilegrid";
import { tile as tileStrategy } from 'ol/loadingstrategy';
import VectorSource from "ol/source/Vector";
import Projection from "ol/proj/Projection";
import { Extent } from "ol/extent";
import EsriJSON from 'ol/format/EsriJSON';
import ImageArcGISRest from "ol/source/ImageArcGISRest";
import ImageWMS from "ol/source/ImageWMS";
import GeoJSON from "ol/format/GeoJSON";
import ILayer from "../../Domain/Layers/interfaces/ILayer";
import { ConfigLayer } from "../../Configuration/ConfigLayer";
import { Options } from 'ol/source/ImageWMS';
import { MapServiceTypes } from "../../Configuration/MapServiceTypes";
import { ILayerLoader } from "../../Domain/Layers/interfaces/ILayerLoader";
import { arcgisRestLoader } from "./LayerUtils";
import { Feature } from "ol";
import { Geometry } from "ol/geom";



export default class LayersManagerCore implements ILayersManagerCore {
    private mapLayers: Array<ILayer>;
    private map: IAppMap;

    constructor(layerSettings: ConfigLayer[], map: IAppMap) {
        this.map = map;
        this.mapLayers = this.createLayers(layerSettings);
    }

    public loadLayers() {
        this.mapLayers.forEach(l => this.map.getLayers().extend([l]));
    }

    public moveMapLayerByOrderIndex(title: string, direction: string) {
        const targetLayer = this.getLayerByTitle(title);
        const currentIndex = targetLayer.getZIndex() || -1;
        // const moveDirectionIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
        const moveDirectionIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
        let newIndex = this.mapLayers.length - 1 - moveDirectionIndex;

        // targetLayer.setZIndex(moveDirectionIndex);
        const layerIndex = this.getIndexOfLayerByTitle(title);
        const layerToReorder = this.mapLayers.splice(layerIndex, 1)[0];
        this.mapLayers.splice(newIndex, 0, layerToReorder);
        this.reorderLayers();
    }

    public setMapLayerOrderIndex(title: string, index: number) {
        const layerIndex = this.getIndexOfLayerByTitle(title);
        const layerToReorder = this.mapLayers.splice(layerIndex, 1)[0];

        this.mapLayers.splice(index, 0, layerToReorder);

        this.reorderLayers();
    }

    getMapLayers(): ILayer[] {
        return this.mapLayers;
    }

    public reorderLayers() {
        let layerIndexMax = this.mapLayers.length - 1;
        this.mapLayers.forEach((mapLayer, inx) => {
            let index = layerIndexMax - inx;
            mapLayer.setZIndex(index)
        });
    }

    addLayer(layer: ILayer): void {
        this.map.getLayers().extend([layer]);
        this.mapLayers.push(layer);
    }

    removeLayer(layer: ILayer): void {
        this.map.getLayers().remove(layer);
        let layerIndex = this.mapLayers.findIndex(l => layer.title === l.title);
        this.mapLayers.splice(layerIndex, 1);
    }

    removeLayerByTitle(title: string): boolean {
        const layers = this.map.getLayers().getArray();
        const layer = layers.filter(l => (l as ILayer).title === title)[0];

        if (layer) {
            this.map.removeLayer(layer);
            return true
        }

        return false;
    }

    removeAll(): void {
        let layers = this.map.getLayers();
        layers.forEach(layer => {
            this.map.removeLayer(layer);
        });
    }

    public getIndexOfLayerByTitle(title: string) {
        return this.mapLayers.findIndex(l => title === l.title);
    }
    
    getLayerByTitle(title: string): ILayer {
        return this.mapLayers.filter(l => title === l.title)[0];
    }

    public createLayers(layerInfoSettings: ConfigLayer[]): ILayer[] {
        let layerInfos = [] as Array<ILayer | null>;

        let layerIndexMax = layerInfoSettings.length - 1;
        // let layerIndex = layerIndexMax;

        layerInfoSettings.forEach((layerSettings, inx) => {
            let l = this.createLayer(layerSettings);
            // if (l && l.setZIndex) {
            //     const layerIndex = layerIndexMax - inx;
            //     l.setZIndex(layerIndex);
            // };
            layerInfos.push(l);
        })

        return layerInfos.filter(l => l) as ILayer[];
    }

    createLayer(configLayerSettings: ConfigLayer): ILayer | null {
        const layerSettings = { ...configLayerSettings };

        return this.layerFactory(layerSettings);
    }

    layerFactory(layerSettings: ConfigLayer): ILayer | null {
        const title = layerSettings.title;
        const sourceSettings = layerSettings.sourceSettings as Options;
        // const legendInfo = layerSettings.legendInfo;

        if (layerSettings.type === MapServiceTypes.WMS) {
            // sourceSettings.format = new GeoJSON();
            const layerSource = new ImageWMS(sourceSettings);
            const layerObject = new ImageCoreLayer({
                title: title,
                source: layerSource,
                layerId: layerSettings.id,
                type: layerSettings.type
                // legendInfo: legendInfo
            });

            return layerObject;
        }
        else if (layerSettings.type === MapServiceTypes.ARCGIS_IMAGE_SERVICE) {
            const layerSource = new ImageArcGISRest({ ...sourceSettings });
            const layerObject = new ImageCoreLayer({
                source: layerSource,
                title: title,
                layerId: layerSettings.id,
                type: layerSettings.type
            });

            return layerObject;
        }
        else if (layerSettings.type === MapServiceTypes.ARCGIS_MAP_SERVICE) {
            const source = new ImageArcGISRest({
                ratio: 1,
                params: layerSettings.sourceSettings.params,
                url: layerSettings.sourceSettings.url,
            });

            return new ImageCoreLayer({
                title: layerSettings.title,
                source: source,
                layerId: layerSettings.id,
                type: layerSettings.type
                // legendInfo: legendInfo
            });
        }

        else if (layerSettings.type === MapServiceTypes.ARCGIS_FEATURE_SERVICE) {
            const layerUrl = sourceSettings.url as string;
            const esrijsonFormat = new EsriJSON();
            const vectorSource: VectorSource = new VectorSource({
                url: layerUrl,
                loader: (extent: Extent, resolution: number, projection: Projection) => this.layerLoader({ extent, resolution, projection, layerUrl, esrijsonFormat, vectorSource }),
                strategy: tileStrategy(createXYZ({
                    tileSize: 512
                }))
            });

            const layerObject = new VectorCoreLayer({
                source: vectorSource,
                layerId: layerSettings.id,
                title: title,
                type: layerSettings.type
            });

            return layerObject;
        }

        else if (layerSettings.type === MapServiceTypes.WFS) {
            const vectorSource = new VectorSource({
                format: new GeoJSON(),
                url: layerSettings.sourceSettings.url
            });

            const layerObject = new VectorCoreLayer({
                layerId: layerSettings.id,
                source: vectorSource
            });

            return layerObject;
        }

        return null;
    }

    public async getLayerInfo(layer: ILayer) {
        const layerSource = layer.getSource();
        const url = (layerSource as ImageArcGISRest | VectorSource).getUrl() || '';
        const mapLayersInfo = [];

        try {
            if (layer.layerDataType === MapServiceTypes.ARCGIS_MAP_SERVICE) {
                const result = await axios.get(`${url}?f=json`)
                const targetLayersInfo = result.data.layers;
                targetLayersInfo.forEach((layerInfo: any) => {
                    mapLayersInfo.push({id: layerInfo.id, title: layerInfo.name});
                });
            } else if (layer.layerDataType === MapServiceTypes.WMS) {
                const result = await axios.get(`${url}?request=GetCapabilities&service=WMS`, {
                    headers: {
                        'Content-Type': 'application/xml'
                    }
                });
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(result.data, "text/xml");
                const layers = xmlDoc.getElementsByTagName('Layer');
                for (let i = 0; i < layers.length; i++) {
                    const layer = layers[i];
                    const name = layer.getElementsByTagName('Name')[0].textContent;
                    const title = layer.getElementsByTagName('Title')[0].textContent;
                    mapLayersInfo.push({title, id: name});
                }
            }
        } catch (error) {
            console.error(error);
        }

        return {
            title: layer.title,
            type: layer.layerDataType,
            layerId: layer.appLayerId,
            layerUrl: typeof url === 'string' ? url : '',
            show: layer.getVisible(),
            mapLayersInfo
        }
    }

    private async layerLoader({ extent, resolution, projection, layerUrl, esrijsonFormat, vectorSource }: ILayerLoader & { vectorSource: VectorSource }) {
        try {
            const features: Feature<Geometry>[] = await arcgisRestLoader({ extent, resolution, projection, layerUrl, esrijsonFormat })
            if (features.length > 0) {
                vectorSource.addFeatures(features);
            }
        } catch (error) {
            console.error(error)
        }
    }
}
