import LayerImage from 'ol/layer/Image';
import { Options } from 'ol/layer/BaseImage';
import ILayer from '../../../Domain/Layers/interfaces/ILayer';
import ImageSource from 'ol/source/Image';
import { ILayerConfigOptions } from '../../../Domain/Layers/interfaces/ILayerConfigOptions';


interface DomainLayerOptions extends Options<ImageSource>, ILayerConfigOptions { }

export default class ImageCoreLayer extends LayerImage<ImageSource> implements ILayer {
    appLayerId: string;
    title: string;
    legendSymbol: string;
    removable: boolean;
    show: boolean;
    layerDataType: string;

    constructor(opt_options?: DomainLayerOptions) {
        super(opt_options);
        this.appLayerId = opt_options?.layerId || "";
        this.title = (opt_options && opt_options.title) || "";
        this.layerDataType = opt_options?.type || "";
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