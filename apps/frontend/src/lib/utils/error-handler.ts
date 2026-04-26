import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as ErrorResponse;
    
    switch (status) {
      case 400:
        return data?.message || 'Dados inválidos. Verifique as informações.';
      case 401:
        return 'Não autorizado. Faça login novamente.';
      case 403:
        return 'Acesso negado. Você não tem permissão.';
      case 404:
        return 'Recurso não encontrado.';
      case 429:
        return 'Muitas tentativas. Aguarde alguns segundos e tente novamente.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return data?.message || `Erro ${status}: ${error.message}`;
    }
  }
  
  if (error instanceof Error) {
    return error.message || 'Ocorreu um erro inesperado.';
  }
  
  return 'Ocorreu um erro inesperado.';
}

export function logError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}] ` : '';
  
  // Apenas log, não lança erro
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();
    
    // Log silencioso sem stack trace gigante
    console.warn(`${prefix}⚠️ API Error: ${method} ${url} - Status: ${status}`);
    
    if (status === 429) {
      console.warn(`${prefix}⏳ Rate limit: Muitas tentativas. Aguarde um momento.`);
    }
  } else if (error instanceof Error) {
    console.warn(`${prefix}⚠️ Error:`, error.message);
  } else {
    console.warn(`${prefix}⚠️ Unknown error`);
  }
}