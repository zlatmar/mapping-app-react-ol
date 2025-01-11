import * as React from 'react';
import MapButton from './MapButton';
import MapInfo from '../../resources/map_info.svg';
import MapMeasure from '../../resources/map_measure.svg';
import MapSelect from '../../resources/map_select.svg';
import ZoomInIcon from '../../resources/zoom_in.svg';
import ZoomOutIcon from '../../resources/zoom_out.svg';


const MapTools = () => {

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
            <MapButton clickHandler={() => console.log('Identify')} icon={MapInfo}/>
            <MapButton clickHandler={() => console.log('Measure')} icon={MapMeasure}/>
            <MapButton clickHandler={() => console.log('Selection')} icon={MapSelect}/>
            <MapButton clickHandler={() => console.log('Zoom in')} icon={ZoomInIcon} />
            <MapButton clickHandler={() => console.log('Zoom out')} icon={ZoomOutIcon} />
        </div>
    );
};

export default MapTools;
