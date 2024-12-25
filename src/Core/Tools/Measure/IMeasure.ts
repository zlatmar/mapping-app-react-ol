export interface IMeasure {
    measuredFeatures: Array<any>;
    // draw: Draw;
    // map: IMap;

    measureArea(): void;
    measureLine(): void;
    // onMeasureStart: (evt: DrawEvent) => void;
    clear(): void;
    stopDraw(): void;
    startMeasure(type: string): void;
    onDrawEnd(): void;
}