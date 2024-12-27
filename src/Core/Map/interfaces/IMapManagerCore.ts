import { MapSettings } from "../../../View/AppConfiguration/types/MapSettings";
import IAppMap from "./IAppMap";
import AppMapView from "./AppMapView";
import ILayer from "../../Layers/interfaces/ILayer";

export default interface IMapManagerCore {
    map: IAppMap;
    mapView: AppMapView;
    // layers: ILayer[];

    createMap(layers?: ILayer[]): IAppMap;
    createMapView(mapSettings: MapSettings): AppMapView;
    // createLayers(layerInfoSettings: Array<any>): ILayer[];
    // createLayer(layerInfoSetting: any): ILayer;
    // addLayer(layer: ILayer): void;
    // createFeatureLayer(layerSettings: any, layerId: string): ILayer;
    // setMapProjection
    // setBaseMap
    getOperationalLayers(): ILayer;
    // removeLayer(layer: ILayer): void;
    // getLayerByTitle(name: string): ILayer;
    zoomTo(feature: any, zoom: number, duration: number): void;
    goTo(extent: Array<number>, fromCs?: string, toCs?: string, skipTransform?: boolean): void;
}
