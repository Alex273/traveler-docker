import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {CurrentUserName} from '@widgets/Header/components/UserSection/components/CurrentUserName';
import {ProfileLink} from '@widgets/Header/components/UserSection/components/ProfileLink';
import {LoginLink} from '@widgets/Header/components/UserSection/components/LoginLink';
import {LogoutButton} from '@widgets/Header/components/UserSection/components/LogoutButton';
import styles from '@widgets/Header/components/UserSection/styles.scss';
import {RootState} from '@app/store';

export const View: FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className={styles.user_section}>
            {user ? (
                <>
                    <CurrentUserName name={user.firstName} />
                    <ProfileLink />
                    <LogoutButton />
                </>
            ) : (
                <LoginLink />
            )}
        </div>
    );
};
