declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PORT: number
    DATABASE_URI: string
    HASH_SECRET: string
    COOKIES_DOMAIN: string
    CORS_ORIGIN: string
  }
}
