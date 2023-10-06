import { HttpClient, setupStoreApiConfig, HttpStatusCode, NotFoundError, UnexpectedError, productViewModel } from "../..";

type Input = {
  id: number
}

export const loadById = async ({ id }: Input): Promise<productViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: `/product/${id}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as productViewModel;
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
