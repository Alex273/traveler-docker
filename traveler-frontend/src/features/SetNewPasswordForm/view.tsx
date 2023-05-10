import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {FormValue} from '@features/SetNewPasswordForm/types';
import {useFormik} from 'formik';
import {FormHelperText, TextField} from '@mui/material';
import {useCookies} from 'react-cookie';
import {useHttp} from '@shared/hooks';
import {requestHeaders, setNewPasswordUrl} from '@shared/constants/apiConfig';
import {PATH} from '@app/routing/routes';
import {OauthButton} from '@shared/components/OauthButton';
import styles from '@features/LoginForm/styles.scss';

export const View: FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate();
    const {post, loading, error, clearError} = useHttp();
    const setCookie = useCookies(['user'])[1];

    const passwordRequiredText = 'Password is required';
    const enterPasswordText = 'Enter Password';
    const errorText = 'Something goes wrong';

    const validationSchema = yup.object({
        passwordOne: yup.string().required(passwordRequiredText),
        passwordTwo: yup.string().required(passwordRequiredText),
    });

    const initialValues: FormValue = {
        passwordOne: '',
        passwordTwo: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, {setStatus}) => {
            clearError();

            const userData = {
                passwordOne: values.passwordOne,
                passwordTwo: values.passwordTwo,
            };

            post(setNewPasswordUrl, userData, requestHeaders)
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

                    navigate(PATH.DASHBOARD);
                })
                .catch(() => {
                    // formik.errors.passwordOne = validEmailText;
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
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="passwordOne"
                            name="passwordOne"
                            variant="standard"
                            placeholder={enterPasswordText}
                            type="password"
                            value={formik.values.passwordOne}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordOne && Boolean(formik.errors.passwordOne)}
                            helperText={formik.touched.passwordOne && formik.errors.passwordOne}
                        />
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="passwordTwo"
                            name="passwordTwo"
                            variant="standard"
                            placeholder={enterPasswordText}
                            type="password"
                            value={formik.values.passwordTwo}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordTwo && Boolean(formik.errors.passwordTwo)}
                            helperText={formik.touched.passwordTwo && formik.errors.passwordTwo}
                        />
                    </div>
                    <OauthButton label="Send" />
                    {messageText ? <FormHelperText error>{messageText}</FormHelperText> : null}
                </form>
            </div>
        </>
    );
};
