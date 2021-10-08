import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import GetTableController from "./GetTableController";

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
    const MockGetTableService = { execute: jest.fn() };

    const createUser = new GetTableController(MockGetTableService);

    const req = getMockReq({
      query: { tableId: "615f7444857695dfb05824cd", unusedProp: "asd" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockGetTableService.execute).toHaveBeenCalledWith({
      tableId: "615f7444857695dfb05824cd",
    });
  });

  it("should return validation error", async () => {
    const MockCreateUserService = { execute: jest.fn() };

    const createUser = new GetTableController(MockCreateUserService);

    const req = getMockReq({
      query: { tableId: "" },
    });
    const { res } = getMockRes();

    await createUser.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateUserService.execute).not.toBeCalled();
  });
});
