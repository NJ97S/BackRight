import axios from "axios";

import useAuthStore from "../store/useAuthStore";
import { postRefreshToken } from "./api";
import PATH from "../constants/path";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const refreshTokenInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onAccessTokenFetched = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { fetchUserInfo, logout } = useAuthStore.getState();

    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await postRefreshToken();

          isRefreshing = false;

          onAccessTokenFetched();

          await fetchUserInfo();

          return instance(originalRequest);
        } catch (e) {
          isRefreshing = false;

          logout();

          location.href = PATH.SIGN_IN;

          return Promise.reject(e);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(instance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);
