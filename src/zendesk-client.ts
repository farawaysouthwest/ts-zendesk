import axios, { Axios, AxiosRequestConfig } from "axios";
import {
  CreateTicketRequest,
  QueryRequest,
  UpdateTicketRequest,
} from "./types/request-types";
import {
  CreateTicketResponse,
  QueryResponse,
  UpdateTicketResponse,
} from "./types/response-types";
import { ZendeskConfig } from "./types/util-types";

export class ZendeskClient {
  private baseURL: string;
  private username: string;
  private token: string;
  private restHandler: Axios;
  private defaults: AxiosRequestConfig;

  constructor(options: ZendeskConfig) {
    this.baseURL = options.baseURL;
    this.username = `${options.username}/token`;
    this.token = options.token;

    this.defaults = {
      baseURL: this.baseURL,
      headers: options.defaultHeaders,
      auth: {
        username: this.username,
        password: this.token,
      },
      params: {
        async: true,
      },
    };

    this.restHandler = axios.create(this.defaults);
  }

  /**
   *
   * @param params
   * @returns
   */
  public async queryByExternalId(
    params: QueryRequest.Params
  ): Promise<QueryResponse.Res> {
    try {
      const { data } = await this.restHandler.get<QueryResponse.Res>(
        "/tickets",
        {
          params: { ...params },
        }
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async create(
    payload: CreateTicketRequest.Req
  ): Promise<CreateTicketResponse.Res> {
    try {
      const { data } = await this.restHandler.post<CreateTicketResponse.Res>(
        "/tickets",
        {
          ticket: payload.ticket,
        }
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async update(
    payload: UpdateTicketRequest.Req
  ): Promise<UpdateTicketResponse.Res> {
    try {
      const { data } = await this.restHandler.put<UpdateTicketResponse.Res>(
        `/tickets/${payload.id}`
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
