import axios from 'axios';

export function useAxios() {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey: string = import.meta.env.VITE_API_KEY;

    async function fetch<T>(url: string, params?: object = {}): Promise<T> {
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
