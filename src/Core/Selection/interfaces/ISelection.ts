import { Feature } from "../../Map/interfaces/Feature";
import { ISelectedFeature } from "./ISelectedFeature";

export default interface ISelection {
    getSelection(): void;
    selectByLine(): void;
    selectByPoint(): void;
    selectByPolygon(): void;
    stopDraw(): void;
    mapSelection(feature: Feature): void;
    remove(feature: ISelectedFeature): void;
    removeAll(): void;
}
