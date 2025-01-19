import * as React from 'react';
import MapButton from './MapButton';
import MapInfo from '../../resources/map_info.svg';
import MapMeasure from '../../resources/map_measure.svg';
import MapSelect from '../../resources/map_select.svg';
import ZoomInIcon from '../../resources/zoom_in.svg';
import ZoomOutIcon from '../../resources/zoom_out.svg';
import { useState } from 'react';


enum MapToolsEnum {
    IDENTIFY = 'Identify',
    MEASURE = 'Measure',
    SELECTION = 'Selection'
}

type MapToolsProps = {
    identifyHandler: (isIdentify: boolean) => void;
    mapMeasureHandler: (isMeasure: boolean) => void;
}


const MapTools = (props: MapToolsProps) => {
    const [selectedTool, setSelectedTool] = useState<MapToolsEnum | ''>('');

    const identifyHandler = () => {
        if (selectedTool !== MapToolsEnum.IDENTIFY) {
            setSelectedTool(MapToolsEnum.IDENTIFY);
            props.identifyHandler(true);
        } else {
            setSelectedTool('');
            props.identifyHandler(false);
        }
    }

    const mapMeasureHandler = () => {
        if (selectedTool !== MapToolsEnum.MEASURE) {
            setSelectedTool(MapToolsEnum.MEASURE);
            props.mapMeasureHandler(true);
        } else {
            setSelectedTool('');
            props.mapMeasureHandler(false);
        }
        console.log('Measure');
    }

    const mapSelectHandler = () => {
        if (selectedTool !== MapToolsEnum.SELECTION) {
            setSelectedTool(MapToolsEnum.SELECTION);
        } else {
            setSelectedTool('');
        }
        console.log('Selection');
    }

    const zoomInHandler = () => {
        console.log('Zoom In');
    }

    const zoomOutHandler = () => {
        console.log('Zoom Out');
    }

    return (
        <div style={{
            position: 'absolute', 
            zIndex: 2, 
            right: '1.5rem', 
            top: '1.5rem', 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            <MapButton selected={selectedTool === MapToolsEnum.IDENTIFY} clickHandler={identifyHandler} icon={MapInfo}/>
            <MapButton selected={selectedTool === MapToolsEnum.MEASURE} clickHandler={mapMeasureHandler} icon={MapMeasure}/>
            <MapButton selected={selectedTool === MapToolsEnum.SELECTION} clickHandler={mapSelectHandler} icon={MapSelect}/>
            <MapButton clickHandler={zoomInHandler} icon={ZoomInIcon} />
            <MapButton clickHandler={zoomOutHandler} icon={ZoomOutIcon} />
        </div>
    );
};

export default MapTools;
