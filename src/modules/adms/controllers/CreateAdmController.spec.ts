import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import CreateUserController from "./CreateAdmController";

describe("Create adm controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("should clear body", async () => {
    const MockCreateUserService = { execute: jest.fn() };

    const createUser = new CreateUserController(MockCreateUserService);

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

  it("should return not valid email error", async () => {
    const MockCreateUserService = { execute: jest.fn() };

    const createUser = new CreateUserController(MockCreateUserService);

    const req = getMockReq({
      body: { email: "adm@", password: "123456" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateUserService.execute).not.toBeCalled();
  });

  it("should return not valid password error", async () => {
    const MockCreateUserService = { execute: jest.fn() };

    const createUser = new CreateUserController(MockCreateUserService);

    const req = getMockReq({
      body: { email: "adm@adm.com", password: "123" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateUserService.execute).not.toBeCalled();
  });
});
