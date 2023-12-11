import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import CreateRestaurantController from "./CreateRestaurantController";

describe("Create restaurant controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Restaurant.deleteMany();
  });

  it("should clear body", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateRestaurantController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { name: "Suqueria", items: ["suco de laranja"] },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateRestaurantService.execute).toHaveBeenCalledWith({
      name: "Suqueria",
    });
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateRestaurantController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { items: ["suco de laranja"] },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new CreateRestaurantController(
      MockCreateRestaurantService
    );

    const req = getMockReq({
      body: { name: "Su" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });
});
