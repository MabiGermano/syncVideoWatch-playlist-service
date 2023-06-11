declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PLAYER_SERVER_ORIGIN: string;
        CORS_ORIGIN:string;
      }
    }
  }
export {};