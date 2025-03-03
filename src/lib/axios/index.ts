import axios, { AxiosInstance } from "axios";
import { errorInterceptor, requestInterceptor, successInterceptor } from "./interceptors";
import { BASE_URL } from "@/config/index";

const createApiInstance = (baseUrl: string) => {
  const axiosRequestConfig = {
    baseURL: baseUrl,
  };
  const api: AxiosInstance = axios.create(axiosRequestConfig);
  api.interceptors.request.use((config) => requestInterceptor(config));
  api.interceptors.response.use(successInterceptor, errorInterceptor);
  return api;
};

const api = createApiInstance(BASE_URL);

export { api };
