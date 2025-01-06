import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import LayerListIcon from '../../resources/layers.svg';
import { CustomTreeItem } from './TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view';
import { alpha } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ZoomToIcon from '../../resources/zoom_to.svg';
import LegendIcon from '../../resources/legend.svg';
import Delete from '../../resources/delete.svg';
import { RowButtonIcon } from './RowButtonIcon';


export type LayerListProps = {
    layers: any[];
}

const LayerListIconComponent = (props: SvgIconProps) => {
    return (
        <div style={{ height: '2rem', width: '2rem', backgroundImage: 'url(' + LayerListIcon + ')', backgroundRepeat: "no-repeat", backgroundPosition: 'center' }}></div>
    )
}

const LayerList = (props: LayerListProps) => {
    const { layers } = props;

    if (!layers.length) {
        return null;
    }

    return (
        <div style={{ width: '100%' }}>
            <SimpleTreeView
                // aria-label="gmail"
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
                                        itemId={`sub-tree-item-${layer.mapName}-${mapLayer.layerName}`}
                                        label={mapLayer.layerName}
                                        labelIcon={LayerListIconComponent}
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
