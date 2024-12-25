import { getAppConfig } from "./AppConfiguration/configLoader";
import MapManager from "../Domain/Map/MapManager";
import LayersManager from "../Domain/Layers/LayerManager";
import { AppConfig } from "./AppConfiguration/AppConfigTypes";
import IdentifyManager from "../Domain/Identify/IdentifyManager";

getAppConfig('/config.json').then(configFile => {
    const mapManager = MapManager.getInstance('map', (configFile as AppConfig).mapSettings);
    const layersManager = LayersManager.getInstance((configFile as AppConfig).layers, mapManager?.map);

    layersManager.loadLayers();

    const map = mapManager?.map;
    if (map) {
        const identifyManager = IdentifyManager.getInstance(map, layersManager);
        identifyManager.activate();
    }


});
