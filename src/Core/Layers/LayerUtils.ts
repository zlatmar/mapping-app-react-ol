import axios from "axios";
import { ILayerLoader } from "./interfaces";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

export const arcgisRestLoader = ({ extent, resolution, projection, layerUrl, esrijsonFormat }: ILayerLoader): Promise<Feature<Geometry>[]> => {
    return new Promise(async (resolve, reject) => {
        const url = layerUrl + '/query?' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                ',"spatialReference":{"wkid":3857}}') +
            '&geometryType=esriGeometryEnvelope&inSR=3857&outFields=*' +
            '&outSR=3857';
        
        try {
            const result = await axios.get(url, { params: { 'f': 'json' } })
            var features = esrijsonFormat.readFeatures(result.data, {
                featureProjection: projection,
            });
            // if (features.length > 0) {
            //     vectorSource.addFeatures(features);
            // }
            resolve(features);
        } catch (error) {
            reject(error)
        }
    });
}
