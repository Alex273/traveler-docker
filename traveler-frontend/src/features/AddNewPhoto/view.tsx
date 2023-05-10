import React, {FC, useState} from 'react';
import {Button} from '@mui/material';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {FormHelperText, TextField} from "@mui/material";

import {useHttp} from '@shared/hooks';
import {addNewPhotoUrl} from '@shared/constants/apiConfig';
import {FilesUpload} from "@components/FilesUpload";
import {PhotoData} from "@features/AddNewPhoto/types";
import styles from '@features/AddNewPhoto/styles.scss';

export const View: FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState<File | string>('');
    const [disableAddButton, setDisableAddButton] = useState(true);

    const {post, loading, error, clearError} = useHttp();

    const titleRequiredText = 'Title is required';
    const countryRequiredText = 'Country is required';
    const authorRequiredText = 'Author is required';
    const dateRequiredText = 'Date is required';

    const requiredText = 'Please, fill this field';
    const enterTitleText = 'Enter title';
    const enterCountryText = 'Enter Country';
    const enterAuthorText = 'Enter author';
    const enterDateText = 'Enter date';
    const errorText = 'Error text';

    const validationSchema = yup.object({
        title: yup.string().required(titleRequiredText),
        country: yup.string().required(countryRequiredText),
        author: yup.string().required(authorRequiredText),
        postDate: yup.string().required(dateRequiredText),
    });

    const initialValues: PhotoData = {
        title: '',
        country: '',
        author: '',
        postDate: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, {setStatus}) => {
            clearError();

            const photoData = {
                ...values,
            };

            post(addNewPhotoUrl, photoData)
                .then((response: any) => {
                    if (!response) {
                        return;
                    }

                    if (response.response && response.error) {
                        const text = `${errorText} \n ${response.response}`;

                        setMessageText(text);
                        return;
                    }

                })
                .catch(() => {
                    //formik.errors.photo = validEmailText;
                })
                .finally(() => {
                    console.log(formik.errors);
                    //return formik.errors;
                });
            }
    });
    // CustomFileUpload

    return (
        <>
            <div className={styles.add_photo_form__content}>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            variant="standard"
                            placeholder={enterTitleText}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="country"
                            name="country"
                            variant="standard"
                            placeholder={enterCountryText}
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="author"
                            name="author"
                            variant="standard"
                            placeholder={enterAuthorText}
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            error={formik.touched.author && Boolean(formik.errors.author)}
                            helperText={formik.touched.author && formik.errors.author}
                        />
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <TextField
                            fullWidth
                            id="postDate"
                            name="postDate"
                            variant="standard"
                            placeholder={enterDateText}
                            value={formik.values.postDate}
                            onChange={formik.handleChange}
                            error={formik.touched.postDate && Boolean(formik.errors.postDate)}
                            helperText={formik.touched.postDate && formik.errors.postDate}
                        />
                    </div>
                    {/*<FilesUpload*/}
                    {/*    file={file}*/}
                    {/*    setFile={setFile}*/}
                    {/*    // buttonStyle={classes.customFileUpload}*/}
                    {/*    setButtonDisabled={setDisableAddButton}*/}
                    {/*    acceptedTypes=".jpg,.jpeg,.png"*/}
                    {/*/>*/}
                    <Button type={'submit'} disabled={disableAddButton}>
                        {'Save'}
                    </Button>
                    {messageText ? (
                        <FormHelperText error>
                            {'Error registration in \n'}
                            {messageText}
                        </FormHelperText>
                    ) : null}
                </form>
            </div>
        </>
    );
};
