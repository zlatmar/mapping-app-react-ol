import DrawCore from "../../../Core/Tools/Draw/DrawCore";

export default class Draw extends DrawCore {
    private static instance: Draw | null = null;
    
    private constructor() {
        super();
    }

    public static getInstance() {
        if (!Draw.instance) {
            Draw.instance = new Draw();
        }
        return Draw.instance;
    }
}