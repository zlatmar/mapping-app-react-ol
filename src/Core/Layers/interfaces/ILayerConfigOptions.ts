import { ILegendInfo } from "./ILegendInfo";

export interface ILayerConfigOptions {
    layerId: string;
    title?: string;
    legendInfo?: ILegendInfo;
    type?: string;
}