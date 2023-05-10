import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {FormValue} from '@features/RegisterForm/types';
import {Formik, Form, Field, FormikHelpers} from 'formik';
import {FormHelperText, TextField, Typography} from "@mui/material";
import {useHttp} from '@shared/hooks';
import {apiUrl, registerUrl, uploadUserProfilePhotoPath, uploadUserProfilePhotoUrl} from '@shared/constants/apiConfig';
import {PATH} from '@app/routing/routes';
import {OauthButton} from '@shared/components/OauthButton';
import styles from '@features/RegisterForm/styles.scss';
import {FilesUpload} from '@components/FilesUpload';
import {uploadFiles} from '@shared/services/upload-file-service';
import {requestHeaders} from '@shared/constants/apiConfig';
// import style from "@components/FilesUpload/styles.scss";

export const View: FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [file, setFile] = useState<File | string>('');
    const [disableAddButton, setDisableAddButton] = useState<boolean>(true);
    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
    const [stateUserPhoto, setStateUserPhoto] = useState<string>('');

    const navigate = useNavigate();
    const {post, loading, error, clearError} = useHttp();


    const validEmailText = 'Enter a valid email';
    const nameRequiredText = 'Name is required';
    const roleRequiredText = 'Role is required';
    const photoRequiredText = 'Photo is required';
    const emailRequiredText = 'Email is required';
    const passwordRequiredText = 'Password is required';
    const enterEmailText = 'Enter Email';
    const enterFirstNameText = 'Enter first name';
    const enterLastNameText = 'Enter last name';
    const enterPasswordText = 'Enter Password';
    const errorText = 'Something goes wrong';

    const SignupSchema = Yup.object().shape({
        userPhoto: Yup.array(),
        firstName: Yup.string().required(nameRequiredText),
        lastName: Yup.string().required(nameRequiredText),
        email: Yup.string().email(validEmailText).required(emailRequiredText),
        role: Yup.string().required(roleRequiredText),
        password: Yup.string().required(passwordRequiredText),
    });

    const initialValues: FormValue = {
        userPhoto: [],
        firstName: '',
        lastName: '',
        email: '',
        role: 'user',
        password: '',
    };

    const onSubmitForm = (values: FormValue, {setSubmitting}: FormikHelpers<FormValue>) => {
        clearError();

            const userData = {
                ...values,
            };

            post(registerUrl, userData, requestHeaders)
                .then((response: any) => {
                    if (!response) {
                        setMessageText(errorText);

                        return;
                    }

                    if (response.error && response.message) {
                        setMessageText(response.message);

                       return;
                    }

                    navigate(PATH.LOGIN);
                })
                .catch((error: Error) => {
                    console.log(error.message);
                })
                .finally(() => {
                //return formik.errors;
            });
    };


    const handleChangeFile = (setFile: (files: string[]) => void, path: string) => async (fileList: File[]) => {
        if (fileList.length === 0) {
            setFile([]);
            return;
        }

        setIsFileUploading(true);

        const uploadResult = await uploadFiles(fileList[0], path);
        const fileName = uploadResult[0]?.filename;

        if (!fileName) {
            setFile([]);
            return;
        }

        const filePath = `${uploadUserProfilePhotoPath}/${fileName}`;

        setIsFileUploading(false);

        setFile([filePath]);
    };

    const getUploadFileSrcList = (src: string, onRemove: () => void) => {
        if (!src) {
            return [];
        }

        return [
            {
                src,
                handleRemove: onRemove,
            },
        ];
    };

    return (
        <>
            <div className={styles.register_form__content}>
                <Formik
                    initialValues={initialValues}
                    // onSubmit={(
                    //     values: FormValue,
                    //     errors: any
                    //     // {setSubmitting}: FormikHelpers<FormValue>
                    // ) => {
                    //     console.log(errors);
                    //     console.log(values);
                    // }}
                    onSubmit={onSubmitForm}
                    validationSchema={SignupSchema}
                >
                    {({values, errors, touched, submitForm, setFieldValue, setFieldTouched, isSubmitting}) => (
                        <Form>
                            <FilesUpload
                                onChangeFile={handleChangeFile((filePath: string[]) => {
                                    setFieldValue(
                                        'userPhoto',
                                        filePath,
                                    );
                                    setFieldTouched('userPhoto', true);
                                }, uploadUserProfilePhotoUrl)}
                                srcList={getUploadFileSrcList(
                                    //TODO: remove apiurl after deployment
                                    values?.userPhoto[0] ? `${apiUrl}/${values.userPhoto[0]}` : '',
                                    () =>
                                    setFieldValue('userPhoto', '')
                                )}
                                type="imagePlaceholder"
                            >
                                <Typography
                                    variant="body1"
                                    component="h4"
                                    // color={
                                    //     errors &&
                                    //     errors[rowData.localeCode] &&
                                    //     errors[rowData.localeCode].imageDesktop &&
                                    //     touched &&
                                    //     touched[rowData.localeCode] &&
                                    //     touched[rowData.localeCode].imageDesktop ?
                                    //         'error' :
                                    //         'primary'
                                    // }
                                >
                                    Upload your image
                                </Typography>
                            </FilesUpload>
                            <div>
                                <Field
                                    name="firstName"
                                    placeholder={enterFirstNameText}
                                    // value={formik.values.firstName}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    // helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    name="lastName"
                                    placeholder={enterLastNameText}
                                    // value={formik.values.lastName}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    // helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}
                            </div>
                            <div style={{margin: '20px 0'}}>
                                <Field
                                    // fullWidth
                                    id="email"
                                    name="email"
                                    variant="standard"
                                    placeholder={enterEmailText}
                                    // value={formik.values.email}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.email && Boolean(formik.errors.email)}
                                    // helperText={formik.touched.email && formik.errors.email}
                                />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </div>
                            <div style={{margin: '20px 0'}}>
                                <Field id="role" name="role" as="select">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Field>
                            </div>
                            <div style={{margin: '20px 0'}}>
                                <Field
                                    // fullWidth
                                    id="password"
                                    name="password"
                                    variant="standard"
                                    placeholder={enterPasswordText}
                                    type="password"
                                    // value={formik.values.password}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.password && Boolean(formik.errors.password)}
                                    // helperText={formik.touched.password && formik.errors.password}
                                />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                            </div>
                            <OauthButton label="Register"/>
                            {messageText ? (
                                <FormHelperText error>
                                    {messageText}
                                </FormHelperText>
                            ) : null}
                        </Form>
                        )
                    }
                </Formik>
            </div>
        </>
    );
};
