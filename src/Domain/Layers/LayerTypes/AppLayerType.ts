export type MapLayer = {
    // layerName: string;
    // layerUrl: string;
    // layerIndex: string;
    // // fieldInfos?: FieldInfo[];
    // visible: boolean;
    // show: boolean;
    // layerOrderNum: number;
    layerName: string | null;
    id: string | null;
}

export type AppLayer = {
    mapName: string;
    mapUrl: string;
    mapLayers: MapLayer[];
    show: boolean;
    orderNum: number;
    selected?: boolean;
}
