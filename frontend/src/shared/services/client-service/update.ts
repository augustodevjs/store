import { FormClientInputModel, FormClientUpdateInputModel, HttpClient, HttpStatusCode, NotFoundError, UnexpectedError, ValidationError, setupStoreApiConfig } from "../..";

type Input = {
  id: number;
  data: FormClientInputModel
};

export const update = async ({ data, id }: Input): Promise<FormClientUpdateInputModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: `/client/${id}`,
    method: "PUT",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as FormClientUpdateInputModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
