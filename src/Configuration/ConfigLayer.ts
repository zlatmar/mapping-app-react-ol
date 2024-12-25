import { IConfigIdentify } from "./IConfigIdentify"
import { IConfigSourceSettings } from "./IConfigSourceSettings"

export type ConfigLayer = {
    title: string;
    id: string;
    type: string;
    sourceSettings: IConfigSourceSettings;
    selectable: boolean;
    identify: IConfigIdentify;
}
