import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import LayerListIcon from '../../resources/layers.svg';

export const LayerListIconComponent = (props: SvgIconProps) => {
    return (
        <div style={{ height: '2rem', width: '2rem', backgroundImage: 'url(' + LayerListIcon + ')', backgroundRepeat: "no-repeat", backgroundPosition: 'center' }}></div>
    )
}
