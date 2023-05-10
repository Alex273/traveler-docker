import React, {FC, ComponentType} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
//import {useAuth} from '@app/hooks';
import {PATH} from '@app/routing/routes';

interface Props {
    component: ComponentType;
    path?: string;
}

export const PrivateRoute: FC<Props> = ({component: RouteComponent}) => {
    // const {isUserAuthorized} = useAuth();
    const isUserAuthorized = true;
    const location = useLocation();
    const {pathname} = location;
    let resultPath: string = PATH.LOGIN;

    return isUserAuthorized ? <RouteComponent /> : <Navigate to={resultPath} />;
};
