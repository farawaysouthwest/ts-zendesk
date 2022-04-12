import { AxiosRequestHeaders } from "axios";

export type ZendeskConfig = {
  baseURL: string;
  username: string;
  token: string;
  defaultHeaders?: AxiosRequestHeaders;
};

export interface Ticket {
  comment?: Comment;
  status?: "solved" | "open" | "new";
  priority?: "low" | "normal";
  subject?: string;
  external_id?: string;
  tags?: string[];
  recipient?: string;
  custom_fields?: { id: number; value: string }[];
  requester?: Requester;
}

export interface Comment {
  body: string;
}

export interface Requester {
  name: string;
  email: string;
}
