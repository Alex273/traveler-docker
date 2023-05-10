import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {listOfNavBarItems} from './navBarConfig';
import {MainNavigationItem} from './typings';
import styles from '@widgets/Header/components/NavBar/styles.scss';

type NavigationProps = {
    viewType: 'desktop' | 'mobile';
    isUserAuthorized: boolean;
};

export const View: FC<NavigationProps> = (props: NavigationProps) => {
    return (
        <div className={styles.main_navbar}>
            {listOfNavBarItems?.map((item: MainNavigationItem) => {
                return (
                    <NavLink key={item.path} to={item.path}>
                        {item.title}
                    </NavLink>
                );
            })}
        </div>
    );
};
