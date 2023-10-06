import { FormProductInputModel, FormProductUpdateInputModel, HttpClient, HttpStatusCode, NotFoundError, UnexpectedError, ValidationError, setupStoreApiConfig } from "../..";

type Input = {
  id: number;
  data: FormProductInputModel
};

export const update = async ({ data, id }: Input): Promise<FormProductUpdateInputModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: `/product/${id}`,
    method: "PUT",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as FormProductUpdateInputModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
