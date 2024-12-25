import { ConfigLayer } from "../../Configuration/ConfigLayer"

export type AppConfig = {
    projectName: string;
    layers: ConfigLayer[];
    basemap: ConfigBasemapType;
    mapSettings: MapSettings
}

export type MapSettings = {
    projection: ConfigMapProjectionType;
    center: [ number, number ];
    zoomLevel: number;
}

export type ConfigBasemapType = {
    imagery: number;
    topo: number;
    osm: number;
    default: string;
    customBaseMaps: ConfigCustomBaseMapType[];
}

export type ConfigCustomBaseMapType = {
    url: string;
    name: string;
}

export type ConfigMapProjectionType = {
    projectionId: string;
    projectionParams: string;
}
