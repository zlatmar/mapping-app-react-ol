import * as React from 'react';
import { useEffect, useState } from "react";
import { getAppConfig } from './AppConfiguration/configLoader';
import MapManager from '../Adapter/Map/MapManager';
import LayersManager from '../Adapter/Layers/LayerManager';
import IdentifyManager from '../Adapter/Identify/IdentifyManager';
import { AppConfig } from './AppConfiguration/types/AppConfig';
import AppMap from './Components/AppMap';
import MapTools from './Components/Tools/MapTools';
import SideDrawerContainer from './Components/SideDrawer/SideDrawerContainer';
import Measure from '../Adapter/Tools/Measure/Measure';


const App = () => {
    const [loading, setLoading] = useState(true);
    const [layerList, setLayerList] = useState<any[]>([]);

    useEffect(() => {
        if (loading) {
            loadApp();
            setLoading(false);
        }

    }, []);

    const loadApp = async () => {
        try {
            setLoading(false);
            const configFile = await getAppConfig('/config.json');
            const mapManager = MapManager.getInstance('map', (configFile as AppConfig).mapSettings);
            if (mapManager?.map) {
                const layersManager = LayersManager.getInstance((configFile as AppConfig).layers, mapManager?.map);
                layersManager.loadLayers();
                layersManager.getAppLayers().then((layers) => {
                    setLayerList(layers);
                });
                // setLayerList(layersManager.getMapLayers());
    
                const map = mapManager?.map;
                if (map) {
                    IdentifyManager.getInstance(map, layersManager);
                }
            }
  
        } catch (error) {
          console.error('Error loading app:', error);
        }
    };

    const identifyHandler = (isIdentify: boolean) => {
        const identifyManager = IdentifyManager.getInstance();
        if (isIdentify) {
            identifyManager?.activate();
        } else {
            identifyManager?.deactivate();
        }
    }

    const mapMeasureHandler = (isMapMeasure: boolean) => {
        if (isMapMeasure) {
            const map = MapManager.getInstance()?.map;
            if (map) {
                const measureTool = Measure.getInstance(map);
                measureTool?.startMeasure('line');
                // measureTool?.activateDraw();
                // measureTool?.activateDrawTool('line');
            }
        } else {
            const measureTool = Measure.getInstance();
            measureTool?.stopMeasure();
            measureTool?.clear();
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MapTools identifyHandler={identifyHandler} mapMeasureHandler={mapMeasureHandler}/>
            <SideDrawerContainer layers={layerList} />
            <AppMap />
        </div>
    );
}

export default App;
