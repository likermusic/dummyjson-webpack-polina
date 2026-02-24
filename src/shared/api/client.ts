import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import { API_BASE_URL } from "./baseUrl";
import type { AuthRefreshResponse } from "@/components/auth-form/types";
import { store } from "@/app/store";
import { setAccessToken } from "@/components/auth-form/model/authSlice";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const protectedApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

protectedApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return;
  }
  const response = await api.post<AuthRefreshResponse>("/auth/refresh", {
    refreshToken,
  });
  if (response.data.accessToken) {
    store.dispatch(setAccessToken(response.data.accessToken));
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data.accessToken;
  }
};

protectedApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.headers["x-retry"]) {
      originalRequest.headers["x-retry"] = "1";
      try {
        const accessToken = await refreshAccessToken();
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return protectedApi.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { protectedApi, api };
