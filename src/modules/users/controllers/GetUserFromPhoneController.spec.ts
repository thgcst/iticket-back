import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import GetUserFromPhoneController from "./GetUserFromPhoneController";

describe("Get user from phone controller", () => {
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
      query: { phone: "(21) 12312-1234" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateUserService.execute).toHaveBeenCalledWith({
      phone: "21123121234",
    });
  });

  it("should return validation error", async () => {
    const MockCreateUserService = { execute: jest.fn() };

    const createUser = new GetUserFromPhoneController(MockCreateUserService);

    const req = getMockReq({
      query: { phone: "" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateUserService.execute).not.toBeCalled();
  });
});
