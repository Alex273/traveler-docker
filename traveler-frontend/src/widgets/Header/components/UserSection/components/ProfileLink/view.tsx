import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '@app/routing/routes';

export const View: FC = () => {
    return (
        <div style={{margin: '0 15px'}}>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
        </div>
    );
};
