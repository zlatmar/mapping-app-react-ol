import { Layer } from "ol/layer";
import { Source } from "ol/source";

export default interface ILayer extends Layer<Source> {
    appLayerId: string;
    title: string;
    legendSymbol: string;
    removable: boolean;
    show: boolean;

    layerDataType: string;
    url?: string;
    setVisibleIndex: (index: number) => void;
    getVisibleIndex: () => number;
}
