import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:8080',
});

export default axiosPublic;