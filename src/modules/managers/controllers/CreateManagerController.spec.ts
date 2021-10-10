import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import CreateManagerController from "./CreateManagerController";

describe("Create manager controller", () => {
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
    const MockCreateManagerService = { execute: jest.fn() };

    const createUser = new CreateManagerController(MockCreateManagerService);

    const req = getMockReq({
      body: {
        email: "manager@manager.com",
        password: "123456",
        restaurant: "fake_id",
      },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateManagerService.execute).toHaveBeenCalledWith({
      email: "manager@manager.com",
      password: "123456",
      restaurant: "fake_id",
    });
  });

  it("should return not valid email error", async () => {
    const MockCreateManagerService = { execute: jest.fn() };

    const createUser = new CreateManagerController(MockCreateManagerService);

    const req = getMockReq({
      body: { email: "manager@", password: "123456", restaurant: "fake_id" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateManagerService.execute).not.toBeCalled();
  });

  it("should return not valid password error", async () => {
    const MockCreateManagerService = { execute: jest.fn() };

    const createUser = new CreateManagerController(MockCreateManagerService);

    const req = getMockReq({
      body: {
        email: "manager@manager.com",
        password: "123",
        restaurant: "fake_id",
      },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateManagerService.execute).not.toBeCalled();
  });

  it("should return no restaurant error", async () => {
    const MockCreateManagerService = { execute: jest.fn() };

    const createUser = new CreateManagerController(MockCreateManagerService);

    const req = getMockReq({
      body: {
        email: "manager@manager.com",
        password: "123",
        restaurant: "",
      },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateManagerService.execute).not.toBeCalled();
  });
});
