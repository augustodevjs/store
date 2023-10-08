import { HttpClient, setupStoreApiConfig, HttpStatusCode, UnexpectedError, preferenceClientViewModel } from "../..";

type Input = {
  id: number;
}

export const getPreferenceClient = async ({ id }: Input): Promise<preferenceClientViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupStoreApiConfig()
  ).request({
    url: `/client/preferences/${id}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as preferenceClientViewModel[];
    default:
      throw new UnexpectedError();
  }
};
