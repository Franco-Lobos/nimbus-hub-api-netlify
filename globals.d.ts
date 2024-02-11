export {};
declare global {
  interface ProcessEnv {
    MONGO_URL: string;
    NODE_ENV: "development" | "production" | "test";
  }
  interface Process {
    env: ProcessEnv;
  }
  let process: Process;
}
