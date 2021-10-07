/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";

import app from "@shared/infra/http/app";
import MongoMock from "@shared/tests/MongoMock";

describe("Create restaurant router", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it("should return error", async () => {
    const response = await request(app)
      .post("/v1/items")
      .send({ name: "asdasd", price: 123 });

    expect(response.statusCode).toBe(400);
  });
});
