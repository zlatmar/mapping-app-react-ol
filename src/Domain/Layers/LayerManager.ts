import LayersManagerCore from "../../Core/Layers/LayersManagerCore";
import IAppMap from "../../Core/Map/interfaces/IAppMap";

export default class LayersManager extends LayersManagerCore {
    private static instance: LayersManager | null = null;
    
    private constructor(layerSettings: any, map: IAppMap) {
        super(layerSettings, map);
    }

    public static getInstance(layerSettings: any, map: any) {
        if (!LayersManager.instance) {
            LayersManager.instance = new LayersManager(layerSettings, map);
        }
        return LayersManager.instance;
    }
}
