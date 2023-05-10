import React, {FC} from 'react';
import {NavBar} from '@widgets/Header/components/NavBar';
import {UserSection} from '@widgets/Header/components/UserSection';
import styles from './styles.scss';

export const View: FC = () => {
    return (
        <div className={styles.header}>
            <NavBar
                viewType='desktop'
                isUserAuthorized
            />
            <UserSection />
        </div>
    );
};
