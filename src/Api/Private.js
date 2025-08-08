import axios from 'axios'

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // adjust as needed
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;