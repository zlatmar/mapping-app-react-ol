import IAppMap from "../../../Domain/Map/interfaces/IAppMap";
import MeasureCore from "../../../Core/Tools/Measure/MeasureCore";

export default class Measure extends MeasureCore {
    private static instance: Measure | null = null;
    
    private constructor(map: IAppMap) {
        super(map);
    }

    public static getInstance(map?: IAppMap) {
        if (!Measure.instance && map) {
            Measure.instance = new Measure(map);
        }
        return Measure.instance;
    }
}