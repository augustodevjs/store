import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders } from "axios";
import { ApiConfig, HttpClientInput, HttpClientOutput } from "../../types";

interface HttpClient {
  request: <TRequest, TResponse>(
    input: HttpClientInput<TRequest>
  ) => Promise<HttpClientOutput<TResponse>>;
}

export class AxiosHttpClient implements HttpClient {
  private constructor(private readonly apiConfig: ApiConfig) { }

  static of(apiConfig: ApiConfig): AxiosHttpClient {
    return new AxiosHttpClient(apiConfig);
  }

  async request<TRequest = any, TResponse = any>(
    input: HttpClientInput<TRequest>
  ): Promise<HttpClientOutput<TResponse>> {
    let response: AxiosResponse;

    try {
      response = await axios.request({
        url: `${this.apiConfig.baseUrl}${input.url}`,
        method: input.method,
        data: input.body,
        headers: { ...this.apiConfig.headers, ...input.headers },
        params: input.params,
        responseType: input.responseType ? input.responseType : "json",
      });
    } catch (error) {
      response = (error as AxiosError).response as AxiosResponse;
    }

    return {
      statusCode: response.status,
      body: response.data,
      headers: response.headers as AxiosResponseHeaders,
    };
  }
}
