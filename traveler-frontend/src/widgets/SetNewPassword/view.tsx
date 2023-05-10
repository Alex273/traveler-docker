import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {SetNewPasswordForm} from '@features/SetNewPasswordForm';

export const View: FC = () => {
    return (
        <>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={11} sm={8} md={6} lg={6} xl={6}>
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>Set new password</h2>
                    <SetNewPasswordForm />
                </Grid>
            </Grid>
        </>
    );
};
