import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: +(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30000),
  headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (Cookies.get("token")) config.headers.Authorization = "Bearer " + Cookies.get("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
