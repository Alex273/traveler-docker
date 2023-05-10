import React, {ChangeEvent, FC, useEffect, useState} from 'react';

import {ShowPopup} from '@shared/components/ShowPopup/action';
import CancelIcon from '@mui/icons-material/Cancel';
import {IconButton} from '@mui/material';
import classNames from "classnames";
// import {makeStyles} from 'tss-react/mui';
import {getUniqueFileList} from './helper';
import style from "./styles.scss";

type Src = {
    src: string,
    handleRemove: () => void,
}

interface FilesUploadProps {
    id?: string,
    name?: string,
    acceptType?: 'image'| 'video';
    children?: JSX.Element | JSX.Element[];
    multiple?: 'multiple';
    onBlur?: (event: ChangeEvent) => void;
    onChangeFile: (files: File[]) => void;
    srcList: Src[];
    value?: any,
    type: 'link'| 'imagePlaceholder';
}

export const View: FC<FilesUploadProps> = (props: FilesUploadProps) => {
    const {onChangeFile, value, srcList, multiple, acceptType, type, onBlur, children} = props;

    const [filesList, setFilesList] = useState<File[]>([]);

    const handleFileChange = (files: FileList | null) => {
        const fileList = files || [];
        const incomingFileList: File[] = [...fileList];

        const rawFileList = multiple === 'multiple' ? [...filesList, ...incomingFileList] : incomingFileList;
        const uniqueFileList = getUniqueFileList(rawFileList);

        setFilesList(uniqueFileList);

        onChangeFile(uniqueFileList);
    };

    const handleBlur = (evt: ChangeEvent) => {
        if (onBlur) {
            onBlur(evt);
        }
    };

    const createRemoveHandler = (evt: React.MouseEvent<HTMLButtonElement>, handleRemove: () => void) => {
        evt.stopPropagation();
        evt.preventDefault();
        handleRemove();
    };

    const onFileClick = (src: string) => {
        ShowPopup(renderUploadFile(src, [style.files_upload__preview_image]));
    };

    const getAcceptValue = () => {
        if (acceptType === 'video') {
            return 'video/webm,video/mp4';
        }
        return 'image/*';
    };

    const renderUploadFile = (src: string, classList: any[]): JSX.Element => {
        const isVideoFile = acceptType === 'video';

        if (isVideoFile) {
            return (
                <video className={classNames(classList)}>
                    <source src={src} />
                </video>
            );
        }
        return <img alt="" className={classNames(classList)} src={src} />;
    };

    const renderSrc = (srcItem: Src): JSX.Element => {
        const {src, handleRemove} = srcItem;

        return (
            <div
                className={classNames([
                    style.files_upload__image_list_item,
                    type === 'link' ? style.files_upload__link_image_list_item : null,
                ])}
                key={src}
                onClick={() => onFileClick(src)}
            >
                {renderUploadFile(src, [
                    style.files_upload__image,
                    type === 'link' ? style.files_upload__link_image : null,
                ])}
                <IconButton
                    className={classNames([style.files_upload__remove_image_button])}
                    color="secondary"
                    onClick={(event) => createRemoveHandler(event, handleRemove)}
                    size="small"
                >
                    <CancelIcon style={{fontSize: type === 'link' ? '18px' : '34px'}} />
                </IconButton>
            </div>
        );
    };

    const renderFileList = (): JSX.Element => {
        return (
            <div className={style.files_upload__image_list}>
                {srcList.map((src) => renderSrc(src))}
                {(srcList.length === 0 || props.multiple === 'multiple') && type !== 'link'
                    ? renderUploadNoImage()
                    : null}
            </div>
        );
    }

    const renderFileInput = (): JSX.Element => {
        return (
            <input
                accept={getAcceptValue()}
                className={style.files_upload__input}
                // multiple={multiple || null}
                onBlur={handleBlur}
                onChange={({target}) => handleFileChange(target.files)}
                value={value}
                type="file"
            />
        );
    }

    const renderUploadNoImage = (): JSX.Element => {
        return (
            <div className={style.files_upload__wrapper}>
                <div className={style.files_upload__input_wrapper}>
                    {renderFileInput()}
                </div>
            </div>
        )
    };

    return <div className={style.files_upload__wrapper}>{renderFileList()}</div>;
};
