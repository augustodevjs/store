import { env } from "../configs"
import { ApiConfig } from "../types";

type SetupApiConfig = (overrides?: ApiConfig) => ApiConfig;

export const setupTodoApiConfig: SetupApiConfig = () => {
  return {
    baseUrl: env.apis.store.baseUrl,
  }
}
