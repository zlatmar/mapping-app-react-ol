import MeasureCore from "../../../Core/Tools/Measure/MeasureCore";

export default class Measure extends MeasureCore {
    private static instance: Measure | null = null;
    
    private constructor() {
        super();
    }

    public static getInstance() {
        if (!Measure.instance) {
            Measure.instance = new Measure();
        }
        return Measure.instance;
    }
}