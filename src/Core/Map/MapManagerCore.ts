import IAppMap from "./interfaces/IAppMap";
import AppMapView from "./interfaces/AppMapView";
import IMapManagerCore from "./interfaces/IMapManagerCore";

// mapping library
import 'ol/ol.css';
import Map from "ol/Map";
import View from "ol/View";
import { Zoom } from "ol/control";
import { OSM } from 'ol/source.js';
import { Tile as TileLayer } from 'ol/layer.js';
import { MapSettings } from "../../View/AppConfiguration/AppConfigTypes";
import ILayer from "../Layers/interfaces/ILayer";

export default class MapManagerCore implements IMapManagerCore {
    private divAnchor: string;
    public map: IAppMap;
    public mapView: AppMapView;
    
    constructor(divAnchor: string, mapSettings?: MapSettings) {
       this.divAnchor = divAnchor;
       
       this.mapView = this.createMapView(mapSettings);
       this.map = this.createMap();
    }

    createMap(): IAppMap {
        return new Map({
            target: this.divAnchor,
            view: this.mapView,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            controls: [
                // new Zoom(),
            ],
        });
    }

    createMapView(mapSettings?: MapSettings): AppMapView {
        return new View({
            center: mapSettings?.center,
            zoom: mapSettings?.zoomLevel,
        });
    }

    getOperationalLayers(): ILayer {
        throw new Error("Method not implemented.");
    }

    zoomTo(feature: any, zoom: number, duration: number): void {
        throw new Error("Method not implemented.");
    }

    goTo(extent: number[], fromCs?: string | undefined, toCs?: string | undefined, skipTransform?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
}