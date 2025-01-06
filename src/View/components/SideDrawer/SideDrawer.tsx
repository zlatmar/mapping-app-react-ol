import * as React from 'react';
import AppSearch from '../Search/AppSearch';
import LayerList, { LayerListProps } from '../LayerList/LayerList';


const SideDrawer = (props: LayerListProps) => {

    return (
        <div>
            <AppSearch />
            <LayerList layers={props.layers} />
        </div>
    )
}

export default SideDrawer;
