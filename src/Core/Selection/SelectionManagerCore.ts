import { Feature } from "../../Domain/Map/interfaces/Feature";
import { ISelectedFeature } from "../../Domain/Selection/interfaces/ISelectedFeature";
import ISelection from "../../Domain/Selection/interfaces/ISelection";

export default class PopupManagerCore implements ISelection {
    getSelection(): void {
        throw new Error("Method not implemented.");
    }
    selectByLine(): void {
        throw new Error("Method not implemented.");
    }
    selectByPoint(): void {
        throw new Error("Method not implemented.");
    }
    selectByPolygon(): void {
        throw new Error("Method not implemented.");
    }
    stopDraw(): void {
        throw new Error("Method not implemented.");
    }
    mapSelection(feature: Feature): void {
        throw new Error("Method not implemented.");
    }
    remove(feature: ISelectedFeature): void {
        throw new Error("Method not implemented.");
    }
    removeAll(): void {
        throw new Error("Method not implemented.");
    }

}