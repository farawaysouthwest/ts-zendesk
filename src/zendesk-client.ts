import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { setTimeout } from "timers/promises";
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
import { Job, ZendeskConfig } from "./types/util-types";

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
  public async queryByTicketId(
    ticketId: number
  ): Promise<QueryResponse.SingleRes> {
    try {
      const { data } = await this.restHandler.get<QueryResponse.SingleRes>(
        `/tickets/${ticketId}`
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *
   * @param params
   * @returns
   */
  public async queryByExternalId(
    params: QueryRequest.Params
  ): Promise<QueryResponse.ListRes> {
    try {
      const { data } = await this.restHandler.get<QueryResponse.ListRes>(
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

  public async checkJobStatus(statusId: string): Promise<Job> {
    try {
      const { data } = await this.restHandler.get<Job>(
        `/job_statuses/${statusId}.json`
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

  public async update(payload: UpdateTicketRequest.Req) {
    try {
      return await this.safeUpdate(payload);
    } catch (error) {
      // if error is zendesk 409, retry update.
      if (error.response.status === 409) {
        return await this.safeUpdate(payload);
      }
      console.error(error.response);
    }
  }

  // Private

  private async safeUpdate(
    payload: UpdateTicketRequest.Req
  ): Promise<UpdateTicketResponse.Res> {
    const {
      ticket: { updated_at },
    } = await this.queryByTicketId(payload.id);

    const { data } = await this.restHandler.put<UpdateTicketResponse.Res>(
      `/tickets/${payload.id}`,
      {
        ticket: {
          updated_stamp: updated_at,
          safe_update: true,
          ...payload.ticket,
        },
      }
    );

    return data;
  }
}
