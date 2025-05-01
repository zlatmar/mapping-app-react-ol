import { Feature } from "../../../../Domain/Map/interfaces/Feature";

export interface IDrawCore {
    lines: Feature[];
    polygons: Feature[];

    drawLine(): void;
    drawPoint(): void;
    drawPolygon(): void;
    getDrawnFeatures(): Feature[];
}