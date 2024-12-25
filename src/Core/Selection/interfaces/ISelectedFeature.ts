import { Feature } from "../../Map/interfaces/Feature";

export interface ISelectedFeature extends Feature {
    selected: boolean;
}
