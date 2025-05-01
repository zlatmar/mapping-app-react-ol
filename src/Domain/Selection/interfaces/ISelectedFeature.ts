import { Feature } from "../../../Domain/Map/interfaces/Feature";

export interface ISelectedFeature extends Feature {
    selected: boolean;
}
