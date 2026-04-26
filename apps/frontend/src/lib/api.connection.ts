import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para log de requisições (desenvolvimento)
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use((config) => {
    const method = config.method?.toUpperCase() || 'UNKNOWN';
    const url = config.url || '';
    console.log(`🚀 [${method}] ${url}`);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      const method = response.config.method?.toUpperCase() || 'UNKNOWN';
      const url = response.config.url || '';
      const status = response.status;
      console.log(`✅ [${method}] ${url} - ${status}`);
      return response;
    },
    (error) => {
      const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
      const url = error.config?.url || '';
      const status = error.response?.status || 'NO_RESPONSE';
      
      // Apenas log, não mostra erro quebrado
      console.warn(`⚠️ [${method}] ${url} - ${status}`);
      
      if (status === 429) {
        console.warn('⏳ Muitas tentativas. Aguarde um momento.');
      }
      
      // Retorna o erro para ser tratado pelo componente
      return Promise.reject(error);
    },
  );
}