import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import CreateRestaurantRouter from "./CreateRestaurantRouter";

describe("Create restaurant router", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Restaurant.deleteMany({});
  });

  it("should clear body", async () => {
    const MockCreateRestauranteService = { execute: jest.fn() };

    const createRestaurant = new CreateRestaurantRouter(
      MockCreateRestauranteService
    );

    const req = getMockReq({
      body: { name: "Suqueria", items: ["suco de laranja"] },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateRestauranteService.execute).toHaveBeenCalledWith({
      name: "Suqueria",
    });
  });

  it("should return validation error", async () => {
    const MockCreateRestauranteService = { execute: jest.fn() };

    const createRestaurant = new CreateRestaurantRouter(
      MockCreateRestauranteService
    );

    const req = getMockReq({
      body: { items: ["suco de laranja"] },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestauranteService.execute).not.toBeCalled();
  });

  it("should return validation error", async () => {
    const MockCreateRestauranteService = { execute: jest.fn() };

    const createRestaurant = new CreateRestaurantRouter(
      MockCreateRestauranteService
    );

    const req = getMockReq({
      body: { name: "Su" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestauranteService.execute).not.toBeCalled();
  });
});
