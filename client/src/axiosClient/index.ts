import Axios from "axios";

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    timeout: 5000
})