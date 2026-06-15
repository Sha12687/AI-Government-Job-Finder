import axios from "axios";

const api = axios.create({

   baseURL: "ai-government-job-finder-cvc.up.railway.app"
});

export default api;