import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import CreateTableController from "./CreateTableController";

describe("Create table controller", () => {
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

    const createRestaurant = new CreateTableController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { number: 1, restaurant: "615f7444857695dfb05824cd" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateRestaurantService.execute).toHaveBeenCalledWith({
      number: 1,
      restaurant: "615f7444857695dfb05824cd",
    });
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateTableController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { number: "", restaurant: "615f7444857695dfb05824cd" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateTableController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { number: 1, restaurant: "" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });
});
