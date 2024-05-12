import axios from 'axios';
import {backendBaseLink} from "./constants.js";

const api = axios.create({
    baseURL: backendBaseLink,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
