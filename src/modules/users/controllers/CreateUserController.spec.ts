import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import CreateUserController from "./CreateUserController";

describe("Create user controller", () => {
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
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateUserController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { name: "John Doe", phone: "(21) 12312-1234" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateRestaurantService.execute).toHaveBeenCalledWith({
      name: "John Doe",
      phone: "21123121234",
    });
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateUserController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { name: "John Doe", phone: "12312" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateUserController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { name: "", phone: "2112341234" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });
});
