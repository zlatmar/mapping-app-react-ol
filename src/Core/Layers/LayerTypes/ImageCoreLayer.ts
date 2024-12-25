import LayerImage from 'ol/layer/Image';
import { Options } from 'ol/layer/BaseImage';
import ILayer from '../interfaces/ILayer';
import ImageSource from 'ol/source/Image';
import { ILayerConfigOptions } from '../interfaces/ILayerConfigOptions';


interface DomainLayerOptions extends Options<ImageSource>, ILayerConfigOptions { }

export default class ImageCoreLayer extends LayerImage<ImageSource> implements ILayer {
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

    constructor(opt_options?: DomainLayerOptions) {
        super(opt_options);
        this.layerId = opt_options?.layerId || "";
        this.title = (opt_options && opt_options.title) || "";
        this.type = opt_options?.type || "";
        this.legendSymbol = (opt_options && opt_options.legendInfo && opt_options.legendInfo.legendSymbol) || "";
        // this._showLegend = (opt_options && opt_options.legendInfo) ? opt_options.legendInfo.showLegend as boolean : false;
        this.show = (opt_options && opt_options.legendInfo) ? opt_options.legendInfo.showLegend as boolean : false;
        this.removable = (opt_options && opt_options.legendInfo) ? opt_options.legendInfo.isTemporary as boolean : false;
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