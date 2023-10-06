import { HttpClient, clientViewModel, setupStoreApiConfig, HttpStatusCode, NotFoundError, UnexpectedError } from "../..";

type Input = {
  id: number
}

export const loadById = async ({ id }: Input): Promise<clientViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: `/client/${id}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as clientViewModel;
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
