import MapManagerCore from "../../Core/Map/MapManagerCore";
import { MapSettings } from "../../View/AppConfiguration/types/MapSettings";

export default class MapManager extends MapManagerCore {
    private static instance: MapManager | null = null;

    private constructor(divAnchor: string, mapSettings?: MapSettings) {
        super(divAnchor, mapSettings);
    }

    static getInstance(divAnchor?: string, mapSettings?: MapSettings) {
        if (!MapManager.instance) {
            if (divAnchor) {
                MapManager.instance = new MapManager(divAnchor, mapSettings);
            }
        }
        return MapManager.instance;
    }

}