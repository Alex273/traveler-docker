import React, {FC} from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
    label: string
}

export const View: FC<ButtonProps> = (props: ButtonProps) => {
    const {label} = props;

    return (
        <>
            <Button
                fullWidth
                type="submit"
                variant="contained"
            >
                <div>{label}</div>
            </Button>
        </>
    );
};
