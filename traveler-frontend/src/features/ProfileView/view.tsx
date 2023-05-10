import React, {FC, memo} from 'react';
import styles from './styles.scss';
import {apiUrl} from '@shared/constants/apiConfig';

interface UserData {
    userPhoto: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

const View: FC<UserData> = memo((props) => {
    const {email, firstName, lastName, role} = props;
    const userPhoto = props.userPhoto ? `${apiUrl}/${props.userPhoto}` : null;

    const renderProfileDataItem = (label: string, value: string): JSX.Element => {
        return (
            <div className={styles.profile_data_item}>
                <span className={styles.profile_data__item_label}>{label}:</span>
                <span className={styles.profile_data__item_value}>{value}</span>
            </div>
        );
    };

    return (
        <>
            <div>
                <h2 style={{display: 'flex', justifyContent: 'flex-start'}}>{`${firstName} ${lastName}`}</h2>
            </div>
            {userPhoto ? (
                <div className={styles.profile_photo}>
                    <img alt="" src={userPhoto} />
                </div>
            ) : (
                <div className={styles.profile_default_photo}>
                    <img alt="" src="" />
                </div>
            )}
            {renderProfileDataItem('email', email)}
            {renderProfileDataItem('role', role)}
        </>
    );
});

View.displayName = 'View';

export default View;
