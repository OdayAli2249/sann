import axios from "axios";
import { logout, useAuthContext } from "@/context/auth";
import { apiConfig } from "@/api/config";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, {
  path: "/",
  sameSite: "none",
  secure: true,
});
const useAxios = () => {
  const {
    state: { },
    dispatch,
  } = useAuthContext();
  const axiosInstance = axios.create({
    baseURL: apiConfig.apiBaseUrl,
  });

  axiosInstance.interceptors.request.use((config) => {
    // config.headers["ngrok-skip-browser-warning"] = true;
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    config.headers['x-api-key'] = 'SANN_BOOKS'
    // config.headers.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!cookies.get("sharedToken") && localStorage.getItem("accessToken")) {
      dispatch(logout());
    }

    return config;
  });

  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     console.log("$#$_____", error);
  //     if (error.response.status !== 401) {
  //       return Promise.reject(error);
  //     }
  //     console.log("$#$____", error); 
  //     const originalRequest = error.config;
  //     if (error.response.status === 401 && !originalRequest._retry) {
  //       const refreshToken = localStorage.getItem("refreshToken");
  //       originalRequest._retry = true;
  //       if (refreshToken) {
  //         axiosInstance
  //           .post(authEndpoints.refreshToken.url, {
  //             token: refreshToken,
  //           })
  //           .then((res) => {
  //             if (res?.data?.data?.accessToken) {
  //               localStorage.setItem("accessToken", res.data.data.accessToken);
  //               cookies.set("sharedToken", res.data.data.accessToken);
  //               originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
  //               return axiosInstance(originalRequest);
  //             } else {
  //               dispatch(logout());
  //             }
  //           })
  //           .catch((err) => {
  //             return Promise.reject(err);
  //           });
  //       } else {
  //         return Promise.reject(error);
  //       }
  //     }
  //   }
  // );

  return axiosInstance;
};

export default useAxios;
