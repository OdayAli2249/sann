import axios from "axios";
import { logout, useAuthContext } from "@/context/auth";
import { API_KEY, BASE_URL } from "../config";
import { authRequestCollection } from "@/api/auth";

const useAxios = () => {
  const {
    state: { },
    dispatch,
  } = useAuthContext();
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['x-api-key'] = API_KEY
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          axiosInstance
            .post(authRequestCollection.logout.url, {
              token: accessToken,
            })
            .then(() => dispatch(logout()))
            .catch((err) => Promise.reject(err));
        } else dispatch(logout());
      }
    }
  );

  return axiosInstance;
};

export default useAxios;
