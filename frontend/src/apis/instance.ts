import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import PATH from "../constants/path";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuthStore.getState();

      logout();

      location.href = PATH.SIGN_IN;
    }

    return Promise.reject(error);
  }
);

export default instance;
