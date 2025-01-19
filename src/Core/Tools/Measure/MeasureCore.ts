import { IMeasure } from "./IMeasure";
import IAppMap from "../../Map/interfaces/IAppMap";
import DrawCore from "../Draw/DrawCore";


export default class MeasureCore implements IMeasure {
    measuredFeatures: any[];
    draw: DrawCore;

    constructor(map: IAppMap) {
        this.measuredFeatures = [];
        this.draw = new DrawCore(map);
    }

    measureArea(): void {
        throw new Error("Method not implemented.");
    }
    measureLine(): void {
        throw new Error("Method not implemented.");
    }

    clear(): void {
        this.draw.clearDraw();
    }

    stopMeasure(): void {
        this.draw.deactivateDrawTool();
    }

    startMeasure(type: string): void {
        this.draw.activateDrawTool(type);
    }
}
