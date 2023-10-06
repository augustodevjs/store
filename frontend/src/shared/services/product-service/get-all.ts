import { HttpClient, setupStoreApiConfig, HttpStatusCode, UnexpectedError, productViewModel } from "../..";

export const getAll = async (): Promise<productViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: "/product",
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as productViewModel[];
    default:
      throw new UnexpectedError();
  }
};
