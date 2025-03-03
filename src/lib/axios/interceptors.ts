import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "@/config/index";
import { api } from "./index";

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  const url = BASE_URL;
  const config: any = error.config;
  if (error.response?.status === 401 && url && !config._retry) {
    config._retry = true;
    try {
      const response = await fetch(`${url}/tenant-management/users/refresh`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") || "" }),
      });
      const res = await response.json();
      localStorage.setItem("accessToken", res.data.accessToken);
      return api(config);
    } catch (error) {
      localStorage.remove("accessToken");
      localStorage.remove("refreshToken");
      location.reload();
    }
    return await Promise.reject(error);
  }
  return await Promise.reject(error);
};
