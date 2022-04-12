import Sinon = require("sinon");
import { ZendeskConfig } from "../types/util-types";
import { ZendeskClient } from "../zendesk-client";

describe("Zendesk client", () => {
  //const mockAxios = Sinon.stub(axios, "get");

  // client
  let client: ZendeskClient;

  let options: ZendeskConfig = {
    baseURL: "testurl",
    username: "testuser",
    token: "testtoken",
  };

  // setup
  before(() => {
    client = new ZendeskClient(options);
  });

  afterEach(() => {
    Sinon.reset();
  });

  after(() => {
    Sinon.restore();
  });

  it("Query ticket By external_id", async () => {
    const result = await client.queryByExternalId({
      external_id: "1649719675.118499",
    });
  });

  it("Create ticket", async () => {
    const result = await client.create({
      ticket: {
        comment: {
          body: "test",
        },
        priority: "low",
        subject: "test",
      },
    });
  });
});
