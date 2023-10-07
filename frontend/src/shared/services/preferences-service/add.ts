import { HttpClient, HttpStatusCode, UnexpectedError, setupStoreApiConfig, ValidationError, preferenceInputModel, preferenceViewModel } from "../..";

type Input = {
  data: preferenceInputModel[];
};

export const add = async ({ data }: Input): Promise<preferenceViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: "/preference",
    method: "POST",
    body: data,
  });

  console.log(response)

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as preferenceViewModel[];
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    default:
      throw new UnexpectedError();
  }
};
