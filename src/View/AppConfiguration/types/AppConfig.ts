import { ConfigLayer } from "../../../Configuration/ConfigLayer"
import { ConfigBasemapType } from "./ConfigBasemapType";
import { MapSettings } from "./MapSettings";

export type AppConfig = {
    projectName: string;
    layers: ConfigLayer[];
    basemap: ConfigBasemapType;
    mapSettings: MapSettings
}
