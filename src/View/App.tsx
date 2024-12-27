import * as React from 'react';
import { useEffect, useState } from "react";
import { getAppConfig } from './AppConfiguration/configLoader';
import MapManager from '../Domain/Map/MapManager';
import LayersManager from '../Domain/Layers/LayerManager';
import IdentifyManager from '../Domain/Identify/IdentifyManager';
import { AppConfig } from './AppConfiguration/types/AppConfig';
import AppMap from './Components/AppMap';
import MapTools from './Components/Tools/MapTools';
import SideDrawerContainer from './Components/SideDrawer/SideDrawerContainer';


const App = () => {
    const [loading, setLoading] = useState(true);

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
            const layersManager = LayersManager.getInstance((configFile as AppConfig).layers, mapManager?.map);
    
            layersManager.loadLayers();
    
            const map = mapManager?.map;
            if (map) {
                const identifyManager = IdentifyManager.getInstance(map, layersManager);
                identifyManager.activate();
            }
  
        } catch (error) {
          console.error('Error loading app:', error);
        }
      };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MapTools />
            <SideDrawerContainer />
            <AppMap />
        </div>
    );
}

export default App;
