import { IConfigParams } from "./IConfigParams"

export interface IConfigSourceSettings {
    url: string
    params: IConfigParams
    ratio: number
    serverType: string
    projection: string
    uniqueField: string
    dbLayerName: string
}
