import { TextField } from '@mui/material';
import React from 'react';

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomInput = (props: Props) => {
    return (
        <TextField
            InputProps={{
                style: {
                    border: '1px solid white',
                    color: 'white',
                    width: '30em',
                    borderRadius: 10,
                    fontSize: 20                    
                },
            }}
            margin='normal'
            name={props.name}
            type={props.label}
            label={props.label}            
        />
    );
};

export default CustomInput;
