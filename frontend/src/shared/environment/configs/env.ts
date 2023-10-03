import { Environment } from "../types";

type ApisEnvironment = {
  store: {
    baseUrl: string | undefined;
  };
};

export const env: Environment<ApisEnvironment> = {
  app: {
    name: "Store",
    homepageUrl: "/",
  },
  apis: {
    store: {
      baseUrl: import.meta.env.VITE_API_TODO,
    },
  },
};
