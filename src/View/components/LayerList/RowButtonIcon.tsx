import * as React from 'react';

export const RowButtonIcon = (props: { image: string; title: string; clickHandler: (ev: any) => void; }) => {
    const { image, clickHandler } = props;
    return (
        <div onClick={clickHandler} >
            <div 
                title={props.title}
                style={{ height: '2rem', width: '2rem', backgroundImage: 'url(' + image + ')', backgroundRepeat: "no-repeat", backgroundPosition: 'center' }}>
            </div>
        </div>
    );
}
