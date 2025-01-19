import { IDrawCore } from "../Draw/interfaces/IDrawCore";

export interface IMeasure {
    measuredFeatures: Array<any>;
    draw: IDrawCore;

    measureArea(): void;
    measureLine(): void;
    // onMeasureStart: (evt: DrawEvent) => void;
    clear(): void;
    stopMeasure(): void;
    startMeasure(type: string): void;
    // onMeasureEnd(): void;
}
