import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {useSelector} from 'react-redux';
import {AddNewPhoto} from '@features/AddNewPhoto';
import {RootState} from '@app/store';
import {ProfileView} from '@features/ProfileView';

export const View: FC = () => {
    const user = useSelector((state: RootState) => state?.user);

    if (!user) {
        return null;
    }

    const {userPhoto, email, firstName, lastName, role} = user;

    return (
        <>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={11} sm={8} md={6} lg={6} xl={6}>
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>Profile</h2>
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <ProfileView
                            userPhoto={userPhoto}
                            email={email}
                            lastName={lastName}
                            firstName={firstName}
                            role={role}
                        />
                    </div>
                    <h4 style={{display: 'flex', justifyContent: 'center'}}>Add new photo</h4>
                    <AddNewPhoto />
                </Grid>
            </Grid>
        </>
    );
};
