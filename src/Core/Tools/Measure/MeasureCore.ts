import { IMeasure } from "./IMeasure";

export default class MeasureCore implements IMeasure {
    measuredFeatures: any[];

    constructor() {
        this.measuredFeatures = [];
    }

    measureArea(): void {
        throw new Error("Method not implemented.");
    }
    measureLine(): void {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    stopDraw(): void {
        throw new Error("Method not implemented.");
    }
    startMeasure(type: string): void {
        throw new Error("Method not implemented.");
    }
    onDrawEnd(): void {
        throw new Error("Method not implemented.");
    }
}
