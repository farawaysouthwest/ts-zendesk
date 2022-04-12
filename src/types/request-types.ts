import { Ticket } from "./util-types";

export module QueryRequest {
  export interface Params {
    external_id?: string;
  }

  export interface Req {
    ticket: Payload;
  }

  export interface Payload {}
}

export module CreateTicketRequest {
  export interface Req {
    ticket: Ticket;
  }
}

export module UpdateTicketRequest {
  export interface Req {
    id: number;
    ticket: Ticket;
  }
}
