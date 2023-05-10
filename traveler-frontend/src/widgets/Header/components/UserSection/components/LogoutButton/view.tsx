import React, {FC, MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATH} from '@app/routing/routes';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '@app/store/reducers/user';

export const View: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        dispatch(setCurrentUser(null));
        navigate(PATH.DASHBOARD);
    };

    return (
        <div style={{margin: '0 15px'}}>
            <button onClick={logoutUser}>Log out</button>
        </div>
    );
};
