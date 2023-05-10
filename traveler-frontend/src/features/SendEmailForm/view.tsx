import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {FormValue} from '@features/SendEmailForm/types';
import {useFormik} from 'formik';
import {FormHelperText, TextField} from '@mui/material';
import {useCookies} from 'react-cookie';
import {useHttp} from '@shared/hooks';
import {requestHeaders, sendUserEmailUrl} from '@shared/constants/apiConfig';
import {PATH} from '@app/routing/routes';
import {OauthButton} from '@shared/components/OauthButton';
import styles from '@features/LoginForm/styles.scss';

export const View: FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate();
    const {post, loading, error, clearError} = useHttp();
    const setCookie = useCookies(['user'])[1];

    const validEmailText = 'Enter a valid email';
    const emailRequiredText = 'Email is required';
    const enterEmailText = 'Enter Email';
    const errorText = 'Something goes wrong';

    const validationSchema = yup.object({
        useremail: yup.string().email(validEmailText).required(emailRequiredText),
    });

    const initialValues: FormValue = {
        useremail: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, {setStatus}) => {
            clearError();

            const userData = {
                username: values.useremail,
            };

            post(sendUserEmailUrl, userData, requestHeaders)
                .then((response: any) => {
                    if (!response) {
                        setMessageText(errorText);

                        return;
                    }

                    if (response.error && response.message) {
                        setMessageText(response.message);

                        return;
                    }

                    const accessTokenExpiration = Math.floor(response.access_token_expiration) || 0;
                    const currentTimeInMilliSeconds = new Date().getTime();
                    const accessTokenMaxAgeInMilliseconds = accessTokenExpiration - currentTimeInMilliSeconds;
                    const accessTokenMaxAgeSeconds = accessTokenMaxAgeInMilliseconds / 1000;

                    setCookie('user', response, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                        maxAge: accessTokenMaxAgeSeconds + 15,
                    });

                    navigate(PATH.DASHBOARD);
                })
                .catch(() => {
                    formik.errors.useremail = validEmailText;
                })
                .finally(() => {
                    // console.log(formik.errors);
                    return formik.errors;
                });
        },
    });

    return (
        <>
            <div className={styles.auth_form__content}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            fullWidth
                            id="email"
                            name="useremail"
                            variant="standard"
                            placeholder={enterEmailText}
                            value={formik.values.useremail}
                            onChange={formik.handleChange}
                            error={formik.touched.useremail && Boolean(formik.errors.useremail)}
                            helperText={formik.touched.useremail && formik.errors.useremail}
                        />
                    </div>
                    <OauthButton label="Send email" />
                    {messageText ? <FormHelperText error>{messageText}</FormHelperText> : null}
                </form>
            </div>
        </>
    );
};
