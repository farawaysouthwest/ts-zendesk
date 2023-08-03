// Query Ticket

export module QueryResponse {
  export interface ListRes {
    tickets: Ticket[];
    next_page: null;
    previous_page: null;
    count: number;
  }

  export interface SingleRes {
    ticket: Ticket;
    audit: Audit;
  }

  export interface Audit {}

  export interface Ticket {
    assignee_id: number;
    collaborator_ids: number[];
    created_at: string;
    custom_fields: CustomField[];
    description: string;
    due_at: null;
    external_id: string;
    follower_ids: number[];
    group_id: number;
    has_incidents: boolean;
    id: number;
    organization_id: number;
    priority: string;
    problem_id: number;
    raw_subject: string;
    recipient: string;
    requester_id: number;
    satisfaction_rating: SatisfactionRating;
    sharing_agreement_ids: number[];
    status: string;
    subject: string;
    submitter_id: number;
    tags: string[];
    type: string;
    updated_at: string;
    url: string;
    via: Via;
  }

  export interface CustomField {
    id: number;
    value: string;
  }

  export interface SatisfactionRating {
    comment: string;
    id: number;
    score: string;
  }

  export interface Via {
    channel: string;
  }
}

/// Create Ticket ///

export module CreateTicketResponse {
  export interface Res {
    ticket: Payload;
    job_status: JobStatus;
  }

  export interface JobStatus {
    id: string;
    url: string;
    total: null;
    progress: null;
    status: string;
    message: null;
    results: null;
  }

  export interface Payload {
    id: number;
  }
}

export module UpdateTicketResponse {
  export interface Res {
    ticket: { [key: string]: string | number };
  }
}

/// Upload Attachment ///

export interface Upload {
  attachment: Attachment;
  attachments: Attachment[];
  token: string;
}

export interface Attachment {
  content_type: string;
  content_url: string;
  deleted: boolean;
  file_name: string;
  height: string;
  id: number;
  inline: boolean;
  mapped_content_url: string;
  size: number;
  thumbnails: string[];
  url: string;
  width: string;
}

export interface UploadResponse {
  upload: Upload;
}
