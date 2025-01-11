import * as React from 'react';
import { useState } from 'react';

type MapButtonProps = {
    title?: string;
    icon?: string;
    selected?: boolean;
    clickHandler: (ev: any) => void;
}

const MapButton = (props: MapButtonProps) => {

    return (
        <div 
            style={
                props.selected ?
                {
                    cursor: 'pointer', 
                    background: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '5px',
                    padding: '0.5rem',
                    border: '1px solid #fff'
                }
                :
                {
                cursor: 'pointer', 
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '5px',
                padding: '0.5rem',
                border: '1px solid #808080'

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
