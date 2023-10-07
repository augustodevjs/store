import { HttpClient, clientViewModel, setupStoreApiConfig, HttpStatusCode, UnexpectedError } from "../..";

export const getAll = async (): Promise<clientViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: "/client",
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as clientViewModel[];
    default:
      throw new UnexpectedError();
  }
};
