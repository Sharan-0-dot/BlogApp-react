import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:8080",//"https://blog-deployment-latest-tt98.onrender.com",
});

export default axiosPublic;