import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { clearAll } from "./auth";
import MyNavigate from "./MyNavigate";

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  data: T;
}
const http = axios.create({
  timeout: 2000,
});
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res: HttpResponse = response.data;
    // const navigate = useNavigate();
    // console.log(res);

    if (res.code !== 0) {
      if (res.code === 202) {
        clearAll();
        window.location.href = "/login";
      }
      message.error(res.message);
    }
    return res;
  },
  (error) => {
    console.log(error);
    message.error(error.response.data.message || error.message || "网络错误");
    return Promise.reject(error);
  }
);

export default http;
