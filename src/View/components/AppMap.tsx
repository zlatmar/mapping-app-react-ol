import * as React from 'react';
import { useEffect } from 'react';
import IdentifyManager from '../../Adapter/Identify/IdentifyManager';

const AppMap = () => {

    useEffect(() => {
        mapClick();
    }, []);


    const mapClick = () => {
        const identifyManager = IdentifyManager.getInstance();
        identifyManager?.activate();
    }


    return (
        <div id='map' style={{ height: '100vh', width: '100vw' }} />
    );
}

export default AppMap;
