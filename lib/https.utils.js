import axios from "axios";
import { getToken } from "./storage.utils";

// const http = axios.create({
//   baseURL: "http://localhost:8000/api",
//   timeout: 5000,
// });
const http = axios.create({
  baseURL: "https:///pokhararental-api-v2.onrender.com/api",
  timeout: 5000,
});


http.interceptors.request.use((config) => {
  const token = getToken();
  config = {
    ...config,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return config;
});

export default http;
