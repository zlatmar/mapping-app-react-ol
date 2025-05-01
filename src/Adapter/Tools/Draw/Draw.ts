import IAppMap from "../../../Domain/Map/interfaces/IAppMap";
import DrawCore from "../../../Core/Tools/Draw/DrawCore";

export default class Draw extends DrawCore {
    private static instance: Draw | null = null;
    
    private constructor(map: IAppMap) {
        super(map);
    }

    public static getInstance(map: IAppMap) {
        if (!Draw.instance) {
            Draw.instance = new Draw(map);
        }
        return Draw.instance;
    }
}