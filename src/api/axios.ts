import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 300000,
  headers: { "X-Custom-Header": "foobar", Authorization: "Bearer " + Cookies.get("token") },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
