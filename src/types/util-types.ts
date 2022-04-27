import { AxiosRequestHeaders } from "axios";

export type ZendeskConfig = {
  baseURL: string;
  username: string;
  token: string;
  defaultHeaders?: AxiosRequestHeaders;
};

export interface Ticket {
  comment: Comment;
  status?: "solved" | "open" | "new" | "pending" | "on-hold";
  priority?: "low" | "normal" | "high" | "urgent";
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
  author_id?: number;
  body: string;
  created_at?: string;
  html_body?: string;
  metadata?: { [key: string]: string | number | boolean };
  public?: boolean;
  type?: "Comment" | "VoiceComment";
  via?: Via;
}

export interface Via {
  channel: string;
  source?: { [key: string]: string | number | boolean };
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
