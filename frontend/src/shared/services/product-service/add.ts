import { HttpClient, HttpStatusCode, UnexpectedError, setupStoreApiConfig, ValidationError, FormProductInputModel, productViewModel } from "../..";

type Input = {
  data: FormProductInputModel;
};

export const add = async ({ data }: Input): Promise<productViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: "/product",
    method: "POST",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Created:
      return response.body as productViewModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    default:
      throw new UnexpectedError();
  }
};
