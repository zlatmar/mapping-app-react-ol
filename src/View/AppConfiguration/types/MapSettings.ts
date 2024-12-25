import { ConfigMapProjectionType } from "./ConfigMapProjectionType";

export type MapSettings = {
    projection: ConfigMapProjectionType;
    center: [ number, number ];
    zoomLevel: number;
}