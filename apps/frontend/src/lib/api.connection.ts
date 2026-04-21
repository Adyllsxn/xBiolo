import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // importante para enviar cookies (JWT)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para log de requisições (desenvolvimento)
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use((config) => {
    console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log(
        `✅ [${response.config.method?.toUpperCase()}] ${response.config.url} - ${response.status}`,
      );
      return response;
    },
    (error) => {
      console.error(
        `❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url} - ${error.response?.status}`,
      );
      return Promise.reject(error);
    },
  );
}
