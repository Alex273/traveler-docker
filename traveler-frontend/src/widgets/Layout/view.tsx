import React, {FC, useEffect, useState} from 'react';
import {Route, Routes, Navigate, useLocation} from 'react-router-dom';
import {PATH} from '@app/routing/routes';
import {PrivateRoute} from '@app/routing/components/PrivateRoute';
// import {PublicRoute} from '@app/routing/components/PublicRoute';
import {Dashboard} from '@pages/dashboard';
import {Photos} from '@pages/photos';
import {Login} from '@pages/login';
import {Register} from '@pages/register';
import {SendEmail} from '@pages/send-email';
import {SetNewPassword} from '@pages/set-new-password';
import {NotFound} from '@pages/not-found';
import {Profile} from '@pages/profile';
import {CreateCountry} from '@pages/create-country';
import styles from './styles.scss';

export const View: FC = () => {
    //const {isUserAuthorized} = useAuth();

    return (
        <section className={styles.main_container}>
            <div className={styles.main_content}>
                <Routes>
                    <Route path={PATH.DASHBOARD} element={<Dashboard />} />

                    <Route path={PATH.PHOTOS} element={<Photos />} />

                    <Route path={PATH.PROFILE} element={<PrivateRoute component={() => <Profile />} />} />

                    <Route path={PATH.CREATE_COUNTRY} element={<PrivateRoute component={() => <CreateCountry />} />} />

                    <Route path={PATH.LOGIN} element={<Login />} />

                    <Route path={PATH.REGISTER} element={<Register />} />

                    <Route path={PATH.SEND_EMAIL} element={<SendEmail />} />

                    <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </section>
    );
};
