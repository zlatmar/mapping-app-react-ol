import * as React from 'react';
import { useState } from 'react';

type MapButtonProps = {
    title?: string;
    icon?: string;
    clickHandler: (ev: any) => void;
}

const MapButton = (props: MapButtonProps) => {
    const [selected, setSelected] = useState(false);

    return (
        <div 
            style={{
                cursor: 'pointer', 
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '5px',
                padding: '0.5rem'
            }}
            onClick={props.clickHandler}
        >
            {
                props.icon ? (
                    <img src={props.icon} alt={props.title} style={{width: '2rem', height: '2rem'}} />
                ) : null
            }
            {
                props.title ?? null
            }
            
        </div>
    )
}

export default MapButton;
