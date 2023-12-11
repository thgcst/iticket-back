import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Manager from "../schema";
import SignInManagerController from "./SignInManagerController";

describe("Sign manager in controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Manager.deleteMany();
  });

  it("should clear body", async () => {
    const MockCreateManagerService = { execute: jest.fn() };

    const createManager = new SignInManagerController(MockCreateManagerService);

    const req = getMockReq({
      body: { email: "manager@manager.com", password: "123456" },
    });
    const { res } = getMockRes();

    await createManager.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateManagerService.execute).toHaveBeenCalledWith({
      email: "manager@manager.com",
      password: "123456",
    });
  });
});
