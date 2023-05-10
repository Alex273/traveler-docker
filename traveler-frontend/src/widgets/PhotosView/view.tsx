import React, {FC, useState, useEffect} from 'react';
import {useHttp} from '@shared/hooks';
import {photosUrl} from '@shared/constants/apiConfig';
import styles from '@widgets/PhotosView/styles.scss';

export const View: FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    const [inputValue, setInputValue] = useState('');

    const {get, loading, error, clearError} = useHttp();

    const errorLoggingInText = 'Error logging in';

    useEffect(() => {
        get(photosUrl)
            .then((response: any) => {
                if (!response) {
                    return;
                }

                if (response.response && response.error) {
                    const text = `${errorLoggingInText} \n ${response.response}`;

                    setMessageText(text);
                    return;
                }

                console.log(response);

            })
            .catch((error: any) => {
                console.log(error);
            })
            .finally(() => {
                console.log('Ok');
            });
    }, [])

    return (
        <>
            <div className={styles.photos__content}>

            </div>
        </>
    );
};

