import axios from "axios";

const axiosPublic = axios.create({
    baseURL:  "https://blog-deployment-latest-tt98.onrender.com", 
    // "http://localhost:8080",
});

export default axiosPublic;