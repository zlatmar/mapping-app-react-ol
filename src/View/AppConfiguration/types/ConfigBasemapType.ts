import { ConfigCustomBaseMapType } from "./ConfigCustomBaseMapType";

export type ConfigBasemapType = {
    imagery: number;
    topo: number;
    osm: number;
    default: string;
    customBaseMaps: ConfigCustomBaseMapType[];
}