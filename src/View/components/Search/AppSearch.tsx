import { TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';


const AppSearch = () => {
    const [value, setValue] = useState('');


    const onValueInput = (value: string) => {
        setValue(value);
    }

    return (
        <div style={{ paddingTop: 10, paddingLeft: 10 }}>
            <TextField
                style={{ width: '97%' }}
                value={value}
                onChange={(event: any) => {
                    onValueInput(event.target.value);
                }}
                label={"Search"}
                variant="outlined"
                color={"secondary"}
                />
        </div>
    )
}

export default AppSearch;