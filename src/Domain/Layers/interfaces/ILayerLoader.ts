import { Extent } from "ol/extent";
import EsriJSON from "ol/format/EsriJSON";
import { Projection } from "ol/proj";
import VectorSource from "ol/source/Vector";

export type ILayerLoader = {
    extent: Extent;
    resolution: number;
    projection: Projection;
    layerUrl: string;
    esrijsonFormat: EsriJSON;
}
