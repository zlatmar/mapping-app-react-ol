import * as React from 'react';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const MapTools = () => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            position: 'absolute', 
            zIndex: 2, 
            right: '1.5rem', 
            top: '1.5rem', 
            cursor: 'pointer', 
            background: 'rgb(211,211,211,0.5)',
            borderRadius: '5px',
            padding: '0.5rem'
        }}>
            {
                open ? (
                    <div>
                        <div style={{padding: '0.5rem'}}>Identify</div>
                        <div style={{padding: '0.5rem'}}>Measure</div>
                        <div style={{padding: '0.5rem'}}>Selection</div>
                        <div style={{padding: '0.5rem'}}>Zoom in</div>
                        <div style={{padding: '0.5rem'}}>Zoom out</div>
                        <div style={{padding: '0.5rem'}} onClick={() => setOpen(!open)}>Close</div>
                    </div>
                )
                :
                <div onClick={() => setOpen(!open)}>
                    <MenuIcon  />
                </div>
            }
        </div>
    );
};

export default MapTools;
