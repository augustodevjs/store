import { HttpClient, HttpStatusCode, UnexpectedError, setupStoreApiConfig } from "../..";

type Input = {
  id: string
};

export const remove = async ({ id }: Input) => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: `/product/${id}`,
    method: "DELETE",
  });

  switch (response.statusCode) {
    case HttpStatusCode.NoContent:
      return;
    default:
      throw new UnexpectedError();
  }
};
