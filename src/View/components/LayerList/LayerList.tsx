import * as React from 'react';
import { CustomTreeItem } from './TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view';
import { alpha } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ZoomToIcon from '../../resources/zoom_to.svg';
import LegendIcon from '../../resources/legend.svg';
import Delete from '../../resources/delete.svg';
import { RowButtonIcon } from './RowButtonIcon';
import VisibilityIcon from '../../resources/eye.svg';
import HideVisibilityIcon from '../../resources/eye_hide.svg';
import { LayerListIconComponent } from './LayerListIconComponent';


export type LayerListProps = {
    layers: any[];
}


const LayerList = (props: LayerListProps) => {
    const { layers } = props;

    if (!layers.length) {
        return null;
    }

    return (
        <div style={{ width: '100%' }}>
            <SimpleTreeView
                defaultExpandedItems={layers.map((layer) => (`main-tree-item-${layer.mapName}`))}
                slots={{
                    expandIcon: ArrowRightIcon,
                    collapseIcon: ArrowDropDownIcon,
                    // endIcon: EndIcon,
                }}
                key={'main-tree-view'}
                sx={{ flexGrow: 1, padding: '0.7rem' }}
            >
                {
                    layers.map((layer, index) => (
                        <CustomTreeItem
                            itemId={`main-tree-item-${layer.mapName}`}
                            key={`main-tree-item-${layer.mapName}`}
                            label={layer.mapName}
                            labelIcon={LayerListIconComponent}
                        >
                            {
                                layer.mapLayers.map((mapLayer: any) => (
                                    <CustomTreeItem
                                        key={`sub-tree-item-${layer.mapName}-${mapLayer.layerName}`}
                                        itemId={`sub-tree-item-${layer.mapName}-${mapLayer.layerName}`}
                                        label={mapLayer.layerName}
                                        labelIcon={() => <RowButtonIcon title={"Show"} image={mapLayer.show ? VisibilityIcon : HideVisibilityIcon} clickHandler={() => console.log('Visibility clickHandler')} />
                                    }
                                        // color="#1a73e8"
                                        // bgColor="#e8f0fe"
                                        colorForDarkMode="#B8E7FB"
                                        bgColorForDarkMode={alpha('#00b4ff', 0.2)}
                                        rowIcons={[
                                            <RowButtonIcon title={"Zoom to"} image={ZoomToIcon} clickHandler={() => console.log('Zoom to clickHandler')} />,
                                            <RowButtonIcon title={"Legend"} image={LegendIcon} clickHandler={() => console.log('Legend clickHandler')} />,
                                            <RowButtonIcon title={"Remove"} image={Delete} clickHandler={() => console.log('Delete clickHandler')} />
                                        ]}
                                    />
                                ))
                            }
                        </CustomTreeItem>
                    ))
                }
            </SimpleTreeView>
        </div>
    )
}

export default LayerList;
