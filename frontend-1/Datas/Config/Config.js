import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH,
})

apiClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
    };
    return ({
        ...config,
        headers: {
            "Cache-Control": "no-store",
        },
    })
},
    error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
    response,
    async (error) => {
        return Promise.reject(error.response?.data);
    },
);


const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };


