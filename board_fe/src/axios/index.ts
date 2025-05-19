import axios from "axios";
import { store } from "../store/store";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

const instance = axios.create({
  baseURL: "http://localhost:8000/api"
});

instance.interceptors.request.use(
  (config) => {
    if (config.data && typeof config.data === 'object') {
      config.data = snakecaseKeys(config.data, { deep: true });
    }
    const token = store.getState().auth.tokens.access; // assuming you have `auth.accessToken` in your store

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use((response) => {
  if (response.data && typeof response.data === 'object') {
    response.data = camelcaseKeys(response.data, { deep: true });
  }
  return response;
});

export default instance;