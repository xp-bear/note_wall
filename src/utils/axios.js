//引入端口
import axios from "axios";

import { baseUrl } from "./env";

// 创建一个实例
const service = axios.create({
  baseURL: baseUrl,
  // timeout: 5000,
});

//添加请求拦截器
service.interceptors.request.use(
  // 在请求之前做些什么
  (config) => {
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.status == 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
