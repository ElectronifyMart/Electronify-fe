import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_PRODUCTION,
});
