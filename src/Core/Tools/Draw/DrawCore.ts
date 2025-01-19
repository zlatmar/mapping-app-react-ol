import { IDrawCore } from "./interfaces/IDrawCore";
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import Overlay from "ol/Overlay";
import Geometry, { Type as GeometryType } from 'ol/geom/Geometry';
import MapBrowserEvent from "ol/MapBrowserEvent";
import Feature from "ol/Feature";
import { EventsKey } from "ol/events";
import { Coordinate } from "ol/coordinate";
import { LineString, Polygon } from "ol/geom";
import { getArea, getLength } from 'ol/sphere';
import BaseEvent from "ol/events/Event";
import { unByKey } from "ol/Observable";
import IAppMap from "../../Map/interfaces/IAppMap";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import CircleStyle from 'ol/style/Circle';

export default class DrawCore implements IDrawCore {
    lines: Feature[];
    polygons: Feature[];
    
    map: IAppMap;
    source: VectorSource;
    vector: VectorLayer<VectorSource>;
    draw: Draw | null;
    measureTooltip: Overlay | null;
    measureTooltipElement: HTMLElement | null;
    helpTooltip: Overlay | null;
    helpTooltipElement: HTMLElement;
    typeSelect: string = "";
    sketch: Feature | null;
    listener?: EventsKey | EventsKey[] | null;

    continuePolygonMsg = 'Click on the map to continue drawing';
    continueLineMsg = 'Click on the map to continue drawing';

    constructor(map: IAppMap) {
        this.lines = [];
        this.polygons = [];

        this.map = map;
        this.source = new VectorSource();
        this.vector = new VectorLayer({
            source: this.source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });

        this.map.getLayers().extend([this.vector]);

        this.draw = null;
        this.listener = null;
        this.sketch = null;
        this.helpTooltip = null;
        this.helpTooltipElement = document.createElement('div');
        this.measureTooltipElement = null;
        this.measureTooltip = null;
        // this.callback = callback;
    }


    public activateDrawTool(typeSelect: string) {
        if (typeSelect === 'line' || typeSelect === 'area') {
            this.typeSelect = typeSelect;
            if (this.draw) {
                this.destructor();
            }
            this.addInteraction();

            this.map.on('pointermove', (ev) => { this.pointerMoveHandler(ev) });

            this.map.getViewport().addEventListener('mouseout', () => this.pickMapPoint());
        }
    }

    public deactivateDrawTool() {
        this.destructor();
    }

    public clearDraw() {
        this.source.clear();
        this.map.getOverlays().clear();
        // if (this.typeSelect === 'line' || this.typeSelect === 'area') {
            // this.createHelpTooltip();
            // this.createMeasureTooltip();
        // }
    }

    public onDrawStart(evt: DrawEvent) {
        this.sketch = evt.feature;
        this.listener = this.sketch?.getGeometry()?.on('change', (evt: BaseEvent) => this.onGeometryChange(evt));
    }

    public activateDraw() {
        if (this.draw) {
            this.draw.on('drawstart', (evt: DrawEvent) => this.onDrawStart(evt));
            this.draw.on('drawend', () => this.onDrawEnd());
        }
    }

    public onDrawEnd() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.className = 'tooltip tooltip-static';
        }
        if (this.measureTooltip) {
            this.measureTooltip.setOffset([0, -7]);
        }
        // unset sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        this.createMeasureTooltip();
        if (this.listener) {
            unByKey(this.listener);
        }
        const features = this.source.getFeatures();
        const measuredFeatures = features.map(feature => {
            const featureGeometry = feature.getGeometry() || new Geometry();
            let measuredFeature = {
                id: Math.random().toString(7) + '',
                measurement: '',
                geometry: featureGeometry,
                feature
            }
            if (featureGeometry?.getType() === 'LineString') {
                measuredFeature.measurement = this.formatLength(featureGeometry);
            }
            else {
                measuredFeature.measurement = this.formatArea(featureGeometry);
            }
            return measuredFeature;
        });
        // this.callback(measuredFeatures);
    }
    
    private onGeometryChange(evt: BaseEvent) {
        let tooltipCoord: Coordinate = []; //evt.coordinate;

        let geom = evt.target;
        let output: string = "";
        if (geom instanceof Polygon) {
            output = this.formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
            output = this.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
        }
        if (this.measureTooltipElement) {
            this.measureTooltipElement.innerHTML = output;
        }
        if (this.measureTooltip) {
            this.measureTooltip.setPosition(tooltipCoord);
        }
    }

    private pointerMoveHandler(evt: MapBrowserEvent<UIEvent>) {
        if (evt.dragging) {
            return;
        }
        let helpMsg: string = 'Click on the map';
        if (this.typeSelect === 'area') { //geom instanceof Polygon
            helpMsg = this.continuePolygonMsg;
        } else if (this.typeSelect === 'line') { //geom instanceof LineString
            helpMsg = this.continueLineMsg;
        } else {
            helpMsg = '';
        }

        this.helpTooltipElement.innerHTML = helpMsg;

        if (this.helpTooltip) {
            this.helpTooltip.setPosition(evt.coordinate);
        }

        this.helpTooltipElement.classList.remove('hidden');
    };

    private destructor() {
        if (this.draw) {
            this.map.removeInteraction(this.draw);
        }
        this.map.un('pointermove', this.pointerMoveHandler);
        this.helpTooltipElement.classList.add('hidden');
        this.map.getViewport().removeEventListener('mouseout', () => this.pickMapPoint);
        this.helpTooltipElement.style.display = "none";
    }

    private pickMapPoint() {
        this.helpTooltipElement.classList.add('hidden');
    }

    private addInteraction() {
        let draw = this._createDraw();
        this.map.addInteraction(draw);

        this.createMeasureTooltip();
        this.createHelpTooltip();
        this.activateDraw();
    }

    private createHelpTooltip() {
        if (this.helpTooltipElement && this.helpTooltipElement.parentNode) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }

        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new Overlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        this.map.addOverlay(this.helpTooltip);
    }

    private formatArea(polygon: Geometry): string {
        let area = getArea(polygon);
        let output: string;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        }
        return output;
    }

    private formatLength(line: Geometry): string {
        let length = getLength(line);
        let output: string;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm';
        }
        return output;
    }

    private createMeasureTooltip() {
        if (this.measureTooltipElement && this.measureTooltipElement.parentNode) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: "bottom-center"
        });
        this.map.addOverlay(this.measureTooltip);
    }

    private _createDraw(): Draw {
        let type = '';
        if (this.typeSelect === 'area') {
            type = 'Polygon';

        } else if (this.typeSelect === 'line') {
            type = 'LineString';
        }
        else { // for default
            this.destructor();
        }

        let draw = this.draw = new Draw({
            source: this.source,
            type: type as GeometryType,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        return draw;
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