import * as React from 'react';
import { CSSProperties, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Toggle from '../../resources/toggle.png';
import Untoggle from '../../resources/untoggle.png';
import SideDrawer from './SideDrawer';
import { LayerListProps } from '../LayerList/LayerList';

const drawerWidth = 450;


const SideDrawerContainer = (props: LayerListProps) => {
    const [open, setOpen] = useState(true);

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const getButtonStyles = (width: number, backgroundIcon: string): CSSProperties => {
        return {
            position: 'absolute',
            left: width,
            top: '2.6rem',
            width: 22,
            height: 48,
            border: 'none',
            zIndex: 3,
            background: 'url(' + backgroundIcon + ') no-repeat left top',
            outline: 'none',
            cursor: 'pointer',
        }
    }

    return (
        <div style={{width: drawerWidth + 22, height: '100%', display: 'flex'}}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth + 22,
                        boxSizing: 'border-box',
                        backgroundColor: 'transparent',
                        overflow: 'hidden',
                        borderRight: 'none',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div style={{backgroundColor: 'rgb(255, 255, 255, 0.8)', width: drawerWidth, height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
                    <SideDrawer layers={props.layers} />
                    <button 
                        style={getButtonStyles(drawerWidth, Toggle)}
                        onClick={handleDrawerClose}
                    />
                </div>
                
            </Drawer>
            {
                !open
                ?
                <button 
                    style={getButtonStyles(0, Untoggle)}
                    onClick={handleDrawerOpen}
                />
                :
                null
            }
        </div>
    )
}

export default SideDrawerContainer;
