import axios from 'axios';
import { getToken, removeToken } from './auth';
import imBaseUrl from './url.js'
export const axiosAPI = axios.create({
    baseURL: process.env.REACT_APP_URL
});
console.log(axiosAPI)
// 请求拦截器
axiosAPI.interceptors.request.use((config) => {
    const { url } = config;
    console.log(config)
    if (url.startsWith('/chat')) {
        config.baseURL = imBaseUrl; 
    }
    if (
        url.startsWith('/user')
        && !url.startsWith('/user/login')
        && !url.startsWith('/user/registered')
    ) {
        config.headers.Authorization = getToken();
    }

    return config;
});

// 响应拦截器
axiosAPI.interceptors.response.use((response) => {
    const { status } = response.status;

    if (status === 400) {
        removeToken();
    }

    return response;
});