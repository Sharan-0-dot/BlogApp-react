import axios from 'axios'

const Api = axios.create({
  baseURL:  "http://localhost:8080", 
    // "https://blog-deployment-latest-tt98.onrender.com",
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;