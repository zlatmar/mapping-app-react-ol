import { Layer } from "ol/layer";
import { Source } from "ol/source";

export default interface ILayer extends Layer<Source> {
    layerId: string;
    title: string;
    legendSymbol: string;
    removable: boolean;
    show: boolean;
    type: string;

    setVisibleIndex: (index: number) => void;
    getVisibleIndex: () => number;
}