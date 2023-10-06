import { HttpClient, HttpStatusCode, UnexpectedError, FormClientInputModel, clientViewModel, setupStoreApiConfig, ValidationError } from "../..";

type Input = {
  data: FormClientInputModel;
};

export const add = async ({ data }: Input): Promise<clientViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: "/client",
    method: "POST",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Created:
      return response.body as clientViewModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    default:
      throw new UnexpectedError();
  }
};
