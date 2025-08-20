// src/axios.ts

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';
// 创建一个 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: '/api', // 替换为你的 API 基础 URL
  timeout: 1000 * 60, // 设置请求超时时间
  headers: {
    // 'Content-Type': 'application/json', 
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    // 这里可以添加通用的请求头，例如认证 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse):Promise<AxiosResponse> => {
    let status  = response.data.status;
    switch (status) {
      case 200:
        return response.data;
      case 401:
        // ElMessage.error('登录已过期，请重新登录!');
        localStorage.removeItem('token');
        // window.setTimeout(() => {
        //   router.push('/login');
        // },2000)
        return Promise.reject(response.data);
        default:
          // ElMessage.error(response.data.message);
          return Promise.reject(response.data);
    }

  },
  (error: AxiosError): Promise<AxiosError> => {
    // 处理响应错误，例如显示错误提示
    console.error('API Error:', error.response || error.message);
    
    return Promise.reject(error);
  }
);

export default request;
