import { env } from "../configs"

type ApiConfig = Partial<{
  baseUrl: string
  headers: Record<string, string | number | boolean>
}>

type SetupApiConfig = (overrides?: ApiConfig) => ApiConfig;

export const setupTodoApiConfig: SetupApiConfig = () => {
  return {
    baseUrl: env.apis.store.baseUrl,
  }
}
