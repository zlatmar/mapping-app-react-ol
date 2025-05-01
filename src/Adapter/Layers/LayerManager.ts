import { ConfigLayer } from "../../Configuration/ConfigLayer";
import LayersManagerCore from "../../Core/Layers/LayersManagerCore";
import IAppMap from "../../Domain/Map/interfaces/IAppMap";
import { AppLayer } from "../../Domain/Layers/LayerTypes/AppLayerType";

export default class LayersManager extends LayersManagerCore {
    private static instance: LayersManager | null = null;
    
    private constructor(layerSettings: ConfigLayer[], map: IAppMap) {
        super(layerSettings, map);
    }

    public static getInstance(layerSettings: ConfigLayer[], map: IAppMap) {
        if (!LayersManager.instance) {
            LayersManager.instance = new LayersManager(layerSettings, map);
        }
        return LayersManager.instance;
    }

    public getAppLayers(): Promise<AppLayer[]> {
        let appLayers: AppLayer[] = [];
        const mapLayers = this.getMapLayers();

        return new Promise(async (resolve, reject) => {
            const layersInfoRequests = mapLayers.map(async (layer, index) => await this.getLayerInfo(layer));
            const layersInfoResults = await Promise.all(layersInfoRequests);
            layersInfoResults.forEach((appLayerInfo, index) => {
                appLayers.push({
                    mapName: appLayerInfo.title,
                    mapUrl: appLayerInfo.layerUrl,
                    show: appLayerInfo.show,
                    orderNum: index,
                    selected: false,
                    mapLayers: appLayerInfo.mapLayersInfo.map((layerInfo, index) => ({
                        layerName: layerInfo.title,
                        id: layerInfo.id,
                    }))
                });
            });

            resolve(appLayers);
        })
        // appLayers = mapLayers.map(layer => ({
        //     mapName: layer.title,
        //     mapUrl: layer.get('url'),
        //     wmsUrl
        //     mapLayers
        //     show
        //     orderNum
        //     selected
        //     })
        // );
    }
}
