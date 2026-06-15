import axios from "axios";

const api = axios.create({

   baseURL: "https://your-backend-name.onrender.com"
});

export default api;