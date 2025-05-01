import VectorLayer from "ol/layer/Vector";
import { Options } from "ol/layer/BaseVector";
import ILayer from "../../../Domain/Layers/interfaces/ILayer";
import VectorSource from "ol/source/Vector";
import { ILayerConfigOptions } from "../../../Domain/Layers/interfaces/ILayerConfigOptions";


export interface VectorDomainLayerOptions extends Options<VectorSource>, ILayerConfigOptions { };

export default class VectorCoreLayer extends VectorLayer<VectorSource> implements ILayer {
    public layerId: string;
    public title: string;
    public legendSymbol: string;
    public removable: boolean;
    public show: boolean;
    public type: string;
    // private _title: string;
    // private _legendSymbol: string;
    // private _showLegend: boolean;
    // private _isLegendTemporary: boolean;

    constructor(layerOptions?: VectorDomainLayerOptions) {
        super(layerOptions);
        this.layerId = layerOptions?.layerId || "";
        this.title = (layerOptions && layerOptions.title) || "";
        this.type = layerOptions?.type || "";
        this.legendSymbol = (layerOptions && layerOptions.legendInfo && layerOptions.legendInfo.legendSymbol) || "";
        // this._showLegend = (layerOptions && layerOptions.legendInfo) ? layerOptions.legendInfo.showLegend as boolean : false;
        this.show = (layerOptions && layerOptions.legendInfo) ? layerOptions.legendInfo.showLegend as boolean : false;
        this.removable = (layerOptions && layerOptions.legendInfo) ? layerOptions.legendInfo.isTemporary as boolean : false;
    }


    setVisibleIndex(index: number) {
        super.setZIndex(index);
    }

    getVisibleIndex() {
        return super.getZIndex() || -1;
    }
    // get title(): string {
    //     return this._title;
    // }

    // set vectorLayerId(id: string) {
    //     this.layerId = id;
    // }

    // get vectorLayerId() {
    //     return this.layerId || '';
    // }

    // get legendSymbol(): string {
    //     return this._legendSymbol;
    // }

    // get showLegend(): boolean {
    //     return this._showLegend;
    // }

    // get isLegendTemporary(): boolean {
    //     return this._isLegendTemporary;
    // }
}
