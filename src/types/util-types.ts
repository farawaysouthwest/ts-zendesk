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
  updated_stamp?: string;
  safe_update?: boolean;
}

export interface Comment {
  body: string;
}

export interface Requester {
  name: string;
  email: string;
}

export interface Job {
  job_status: JobStatus;
}

export interface JobStatus {
  id: string;
  message: string;
  progress: number;
  results: Result[];
  status: string;
  total: number;
  url: string;
}

export interface Result {
  action: string;
  id: number;
  status: string;
  success: boolean;
}
