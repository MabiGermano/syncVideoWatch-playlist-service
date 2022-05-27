declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PLAYER_SERVER: string;
      }
    }
  }
export {};