declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      EXPIRATION_TIME: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      token: string;
    }
  }
}