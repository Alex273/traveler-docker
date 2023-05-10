import {httpService} from '@shared/services/httpService';
// export const uploadFilesBaseURI = '/api/local/image-service';

export const uploadFiles = (file: File, path: string): Promise<any> => {
    const formData = new FormData();
    // const pathName = path ? path : 'image';
    // formData.append(pathName, file);
    formData.append('files', file);

    return httpService
        .post<Response>(`${path}`, formData)
        .then((result: Response) => {
            //setLoading(false);

            if (result) {
                return result;
            }

            return;
        })
        .catch((error: any) => {
            //setLoading(false);
            // setError(error.message);
            console.log(error.message);
        });
}
