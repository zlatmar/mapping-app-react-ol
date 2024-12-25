import { Feature } from "../../Map/interfaces/Feature";
import { IDrawCore } from "./interfaces/IDrawCore";

export default class DrawCore implements IDrawCore {
    lines: Feature[];
    polygons: Feature[];

    constructor() {
        this.lines = [];
        this.polygons = [];
    }
    
    drawLine(): void {
        throw new Error("Method not implemented.");
    }
    drawPoint(): void {
        throw new Error("Method not implemented.");
    }
    drawPolygon(): void {
        throw new Error("Method not implemented.");
    }
    getDrawnFeatures(): Feature[] {
        throw new Error("Method not implemented.");
    }
}