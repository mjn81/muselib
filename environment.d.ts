declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      EXPIRATION_TIME: string;
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_MJOLNIR_CATEGORY_MUSIC: string;
      NEXT_PUBLIC_MJOLNIR_URL: string;
      NEXT_PUBLIC_MJOLNIR_TOKEN: string;
      PORT?: string;
      PWD: string;
      token: string;
    }
  }
}