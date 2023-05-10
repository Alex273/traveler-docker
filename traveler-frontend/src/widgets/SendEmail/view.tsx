import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {SendEmailForm} from '@features/SendEmailForm';

export const View: FC = () => {
    return (
        <>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={11} sm={8} md={6} lg={6} xl={6}>
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>Send your email</h2>
                    <SendEmailForm />
                </Grid>
            </Grid>
        </>
    );
};
