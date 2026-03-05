type AppConfig = {
  APP_NAME: string;
  APP_DESCRIPTION: string;
  APP_BASE_URL: string;
  DATE_FORMAT: string;
  IS_PRODUCTION: boolean;
  NODE_ENV?: string;
};

const appConfig: AppConfig = Object.freeze({
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'TODO App',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION ?? 'A simple and efficient task management application',
  APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  DATE_FORMAT: 'YYYY-MM-DD',
  IS_PRODUCTION: import.meta.env.PROD,
  NODE_ENV: import.meta.env.NODE_ENV,
}) as AppConfig;

export default appConfig;
