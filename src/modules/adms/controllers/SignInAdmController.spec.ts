import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Adm from "../schema";
import SignInAdmController from "./SignInAdmController";

describe("Sign adm in controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Adm.deleteMany();
  });

  it("should clear body", async () => {
    const MockCreateAdmService = { execute: jest.fn() };

    const createAdm = new SignInAdmController(MockCreateAdmService);

    const req = getMockReq({
      body: { email: "adm@adm.com", password: "123456" },
    });
    const { res } = getMockRes();

    await createAdm.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateAdmService.execute).toHaveBeenCalledWith({
      email: "adm@adm.com",
      password: "123456",
    });
  });
});
