namespace NodeJS {
  interface ProcessEnv {
           PORT?: number;
           NODE_ENV: 'development' | 'production';
           DATABASE_URL: string;
      }
  }


export {};