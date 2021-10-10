import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import GetUserFromPhoneController from "./SignInAdmController";

describe("Sign adm in controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should clear body", async () => {
    const MockCreateUserService = { execute: jest.fn() };

    const createUser = new GetUserFromPhoneController(MockCreateUserService);

    const req = getMockReq({
      body: { email: "adm@adm.com", password: "123456" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateUserService.execute).toHaveBeenCalledWith({
      email: "adm@adm.com",
      password: "123456",
    });
  });
});
