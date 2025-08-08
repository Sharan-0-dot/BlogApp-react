import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://blog-deployment-latest-tt98.onrender.com",
});

export default axiosPublic;