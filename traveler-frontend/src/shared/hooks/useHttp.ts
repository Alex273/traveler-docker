import {useState, useCallback} from 'react';
import {StringifiableRecord} from 'query-string';
import {httpService} from '@shared/services/httpService';

type DataType = StringifiableRecord | string | null;
type GetDataType = StringifiableRecord | null;

export const useHttp = (): any => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const get = useCallback((url: string, data: GetDataType, headers?: RequestInit): Promise<any> => {
        setLoading(true);

        return httpService
            .get<Response>(url, data, headers)
            .then((result: Response) => {
                setLoading(false);

                if (result) {
                    return result;
                }

                return;
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error.message);
            });
    }, []);

    const post = useCallback((url: string, data?: DataType, headers?: RequestInit): Promise<any> => {
        setLoading(true);

        return httpService
            .post<Response>(url, data, headers)
            .then((result: Response) => {
                setLoading(false);

                if (result) {
                    return result;
                }

                return;
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error.message);
            });
    }, []);

    const put = useCallback((url: string, data?: DataType, headers?: RequestInit): Promise<any> => {
        setLoading(true);

        return httpService
            .put<Response>(url, data, headers)
            .then((result: Response) => {
                setLoading(false);

                if (result) {
                    return result;
                }

                return;
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error.message);
            });
    }, []);

    const del = useCallback((url: string, data?: GetDataType, headers?: RequestInit): Promise<any> => {
        setLoading(true);

        return httpService
            .delete<Response>(url, data, headers)
            .then((result: Response) => {
                setLoading(false);

                if (result) {
                    return result;
                }

                return;
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error.message);
            });
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, get, post, del, put, error, clearError};
};
