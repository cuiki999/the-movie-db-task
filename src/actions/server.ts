import axios from 'axios';

export function useAxios() {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey: string = import.meta.env.VITE_API_KEY;

    interface Params {
        api_key?: string;
        page?: number;
        with_genres?: string;
    }

    async function fetch<T>(url: string, params: Params = {}): Promise<T> {
        if (apiKey) {
            params.api_key = apiKey;
        } else {
            throw 'Please authenticate.';
        }

        return axios
            .get(`${baseUrl}${url}`, { params })
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data?.status_message ?? 'Something went wrong :).';
            });
    }

    return {
        fetch,
    };
}
