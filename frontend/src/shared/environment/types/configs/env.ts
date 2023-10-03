export type AppEnvironment = {
  name: string | undefined
  homepageUrl: string
}

export type Environment<ApisEnvironment> = {
  isProduction?: boolean
  app: AppEnvironment
  apis: ApisEnvironment
}

