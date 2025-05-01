import ILayer from "./ILayer"


export default interface ILayersManager {

    getMapLayers(): ILayer[];

    addLayer(layer: ILayer): void;

    removeLayer(layer: ILayer): void;

    removeLayerByTitle(title: string): boolean;

    removeAll(): void;

    getLayerByTitle(title: string): ILayer;

    createLayers(layerInfoSettings: Array<any>): ILayer[];

    createLayer(layerSettings: any): ILayer | null;
}