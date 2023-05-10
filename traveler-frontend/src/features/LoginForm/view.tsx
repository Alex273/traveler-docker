import React, {FC, useState} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {FormValue} from '@features/LoginForm/types';
import {useFormik} from 'formik';
import {FormHelperText, TextField} from '@mui/material';
import {useHttp} from '@shared/hooks';
import {setCurrentUser, removeCurrentUser} from '@app/store/reducers/user';
import {loginUrl, requestHeaders} from '@shared/constants/apiConfig';
import {PATH} from '@app/routing/routes';
import {OauthButton} from '@shared/components/OauthButton';
import styles from '@features/LoginForm/styles.scss';

export const View: FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    // const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {post, loading, error, clearError} = useHttp();
    // const setCookie = useCookies(['user'])[1];

    const validEmailText = 'Enter a valid email';
    const emailRequiredText = 'Email is required';
    const passwordRequiredText = 'Password is required';
    const errorLoggingInText = 'Error logging in';
    const enterEmailText = 'Enter Email';
    const enterPasswordText = 'Enter Password';
    const errorText = 'Something goes wrong';

    const validationSchema = yup.object({
        useremail: yup.string().email(validEmailText).required(emailRequiredText),
        password: yup.string().required(passwordRequiredText),
    });

    const initialValues: FormValue = {
        useremail: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, {setStatus}) => {
            clearError();

            const userData = {
                username: values.useremail,
                password: values.password,
            };

            post(loginUrl, userData, requestHeaders)
                .then((response: any) => {
                    if (!response) {
                        setMessageText(errorText);

                        return;
                    }

                    if (response.error && response.message) {
                        setMessageText(response.message);

                        return;
                    }

                    dispatch(setCurrentUser(response.user));

                    // const accessTokenExpiration = Math.floor(response.access_token_expiration) || 0;
                    // const currentTimeInMilliSeconds = new Date().getTime();
                    // const accessTokenMaxAgeInMilliseconds = accessTokenExpiration - currentTimeInMilliSeconds;
                    // const accessTokenMaxAgeSeconds = accessTokenMaxAgeInMilliseconds / 1000;
                    //
                    // setCookie('user', response, {
                    //     path: '/',
                    //     secure: true,
                    //     sameSite: 'none',
                    //     maxAge: accessTokenMaxAgeSeconds + 15,
                    // });

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
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            variant="standard"
                            placeholder={enterPasswordText}
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <p>
                        Do not have an account?
                        <NavLink className={styles.nav_link} to={PATH.REGISTER}>
                            Register
                        </NavLink>
                    </p>

                    <p>
                        Forgot password?
                        <NavLink className={styles.nav_link} to={PATH.SEND_EMAIL}>
                            Send your email
                        </NavLink>
                    </p>

                    <OauthButton label="Log in" />
                    {messageText ? <FormHelperText error>{messageText}</FormHelperText> : null}
                </form>
            </div>
        </>
    );
};
