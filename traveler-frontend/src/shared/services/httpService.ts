import queryString, {StringifiableRecord} from 'query-string';
import {PATH} from '@app/routing/routes';
import {requestHeaders} from '@shared/constants/apiConfig';

const defaultErrorMessage = 'Something goes wrong.';

type DataType = StringifiableRecord | FormData | string | null;
type GetDataType = StringifiableRecord | null;

class HttpService {
    public get<T>(url: string, data: GetDataType, config?: RequestInit): Promise<T> {
        const path = `${url}${data ? `?${queryString.stringify(data)}` : ''}`;

        return this.jsonRequest<T>('GET', path, null, config);
    }

    public post<T>(url: string, data?: DataType, config?: RequestInit): Promise<T> {
        return this.jsonRequest<T>('POST', url, data, config);
    }

    public put<T>(url: string, data?: DataType, config?: RequestInit, query?: GetDataType): Promise<T> {
        const path = `${url}${query ? `?${queryString.stringify(query)}` : ''}`;

        return this.jsonRequest<T>('PUT', path, data, config);
    }

    public delete<T>(url: string, data?: GetDataType, config?: RequestInit): Promise<T> {
        const path = `${url}${data ? `?${queryString.stringify(data)}` : ''}`;

        return this.jsonRequest<T>('DELETE', path, null, config);
    }

    public jsonRequest<T>(method: string, url: string, data?: DataType, config?: RequestInit): Promise<T> {
        return this.request(method, url, data, config).then((response) => this.proceedResponse(response));
    }

    private async proceedResponse(responseData: any) {
        const contentType = responseData?.headers.get('Content-type');
        const isTextResponse = contentType?.includes('text/plain');
        const isHtmlResponse = contentType?.includes('text/html');

        if (responseData?.status > 500) {
            console.log('Internal Server Error!');
            return new Error('Internal Server Error!');
        }

        if (responseData?.status === 404) {
            window.location.hash = PATH.NOT_FOUND;
            return new Error('Page NOT Found!');
        }

        let response = responseData;

        if (contentType?.includes('application/json')) {
            response = await responseData.json();
        } else if (isTextResponse || isHtmlResponse) {
            response = await responseData.text();
        } else if (contentType === null) {
            console.log('Unhandled response with content type:', contentType);
        }

        if (responseData.status === 500) {
            if (!isTextResponse && !isHtmlResponse) {
                throw new Error(defaultErrorMessage);
            }
        }

        return response;
    }

    public request(
        method: string,
        url: string | URL,
        data?: DataType,
        config?: RequestInit,
    ): Promise<void | Response> {
        let body;
        if (data) {
            if (data instanceof FormData) {
                body = data;
            } else {
                body = typeof data === 'object' ? JSON.stringify(data) : data;
            }
        }
        const fullUrl = `${url}`;

        return fetch(fullUrl, {method, body, ...config})
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((error) => {
                console.log(`Http service error - ${error.message}`);
                throw error;
            });
    }
}

export const httpService = new HttpService();
