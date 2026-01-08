import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
//        Request 拦截器（请求发送前）
// ============================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加 Token
    const token = localStorage.getItem("hexToken");
    if (token) {
      config.headers.Authorization = token;
    }

    //  打印请求信息（开发环境）
    if (import.meta.env.DEV) {
      console.log(`[${config.method?.toUpperCase()}] ${config.url}`, config);
    }

    return config;
  },
  (error) => {
    // 请求错误处理
    console.error("请求错误：", error);
    return Promise.reject(error);
  }
);

// ============================================
// Response 拦截器（响应接收后）
// ============================================
api.interceptors.response.use(
  (response: AxiosResponse) => {
    //  打印响应（开发环境）
    if (import.meta.env.DEV) {
      console.log(`[${response.status}] ${response.config.url}`, response.data);
    }

    return response;
  },
  (error: AxiosError) => {
    // 401 自動登出
    if (error.response?.status === 401) {
      localStorage.removeItem("hexToken");
      window.location.href = "/#/login";
    }

    // 開發環境印出錯誤
    if (import.meta.env.DEV) {
      console.error("❌ API Error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
