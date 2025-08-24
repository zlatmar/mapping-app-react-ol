import { Extent } from "ol/extent";
import EsriJSON from "ol/format/EsriJSON";
import { Projection } from "ol/proj";

export type ILayerLoader = {
    extent: Extent;
    resolution: number;
    projection: Projection;
    layerUrl: string;
    esrijsonFormat: EsriJSON;
}
