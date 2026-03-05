
type ApiConfig = {
  API_BASE_URL: string;
  API_TOKEN_STORAGE_KEY: string;
};

const apiConfig: ApiConfig = Object.freeze({
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333/api",
  API_TOKEN_STORAGE_KEY: 'api_auth_token',
}) as ApiConfig;

export default apiConfig;
