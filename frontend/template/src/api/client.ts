import axios from 'axios';

/** Axios instance used by every offering page. */
const apiBase = (window as any).FOOD_AGENTIC_MASS_API_BASE
  ?? import.meta.env.VITE_API_BASE
  ?? '/';

export const api = axios.create({
  baseURL: apiBase,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('fam-jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      sessionStorage.removeItem('fam-jwt');
    }
    return Promise.reject(err);
  },
);

export default api;
