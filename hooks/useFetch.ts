import { useEffect, useState } from 'react';

const API_BASE_URL = 'api';

function queryParams(params: Record<string, string>) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export function useFetch(path: string, options: any = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (path) {
            setData(null);
            setLoading(true);
            setError(null);

            // Added sleep to mimic the loading state.
            const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

            const requestFetch = async () => {
                try {
                    await sleep(3000);

                    const requestOptions = {
                        ...options,
                    };

                    let url = `${API_BASE_URL}/${path}`
                    if(options.queryParams) {
                        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
                        delete options.queryParams;
                    }

                    let response = await fetch(url, requestOptions);
                    let responseJson = await response.json();

                    setLoading(false);
                    setData(responseJson);
                } catch (e: any) {
                    setData(null);
                    setLoading(false);
                    setError(e);
                }
            }
            requestFetch();
        }
    }, []);

    return {data, loading, error};
}
