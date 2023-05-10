const getFileId = (file: File): string => {
    return `${file.name}-${file.lastModified}-${file.size}`;
}

const hasListTheFile = (uniqueFileList: File[], file: File): boolean => {
    return Boolean(uniqueFileList.find(uniqueFile => getFileId(uniqueFile) === getFileId(file)));
}

export const getUniqueFileList = (array: File[]): File[] => {
    const uniqueFileList: File[] = [];

    array.forEach(file => {
        if (hasListTheFile(uniqueFileList, file)) {
            return;
        }

        uniqueFileList.push(file);
    });

    return uniqueFileList;
}
