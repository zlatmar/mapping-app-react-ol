import IdentifyManagerCore from "../../Core/Identify/IdentifyManagerCore";
import ILayersManager from "../../Domain/Layers/interfaces/ILayersManagerCore";
import IAppMap from "../../Domain/Map/interfaces/IAppMap";

export default class IdentifyManager extends IdentifyManagerCore {
    private static instance: IdentifyManager | null = null;
    
    private constructor(map: IAppMap, layersManager: ILayersManager) {
        super(map, layersManager);
    }

    public static getInstance(map?: IAppMap, layersManager?: ILayersManager) {
        if (!IdentifyManager.instance && map && layersManager) {
            IdentifyManager.instance = new IdentifyManager(map, layersManager);
        }
        return IdentifyManager.instance;
    }
}