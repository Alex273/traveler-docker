import React, {FC, ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
// import {useAuth} from '@app/hooks';
import {PATH} from '@app/routing/routes';

interface Props {
    component: ComponentType;
    path?: string;
}

export const PublicRoute: FC<Props> = ({component: RouteComponent}) => {
   // const {isUserAuthorized} = useAuth();
    const isUserAuthorized = true;

    return !isUserAuthorized ? <RouteComponent /> : <Navigate to={PATH.LOGIN} />;
};
