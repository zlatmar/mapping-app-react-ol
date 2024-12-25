import { Feature } from "../../../Map/interfaces/Feature";

export interface IDrawCore {
    lines: Feature[];
    polygons: Feature[];

    drawLine(): void;
    drawPoint(): void;
    drawPolygon(): void;
    getDrawnFeatures(): Feature[];
}