import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import GetRestaurantController from "./GetRestaurantController";

describe("Get restaurant router", () => {
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
    const MockGetRestauranteService = {
      execute: jest.fn().mockReturnValue({ status: "success" }),
    };
    const getRestaurant = new GetRestaurantController(
      MockGetRestauranteService
    );

    const createdRestaurant = await Restaurant.create({
      name: "Suqueria",
    });

    const req = getMockReq({
      query: { restaurantId: createdRestaurant._id },
    });
    const { res } = getMockRes();

    await getRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ status: "success" });
    expect(MockGetRestauranteService.execute).toHaveBeenCalledWith({
      restaurantId: String(createdRestaurant._id),
    });
  });

  it("should return validation error", async () => {
    const MockCreateRestauranteService = { execute: jest.fn() };

    const createRestaurant = new GetRestaurantController(
      MockCreateRestauranteService
    );

    const req = getMockReq({});
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestauranteService.execute).not.toBeCalled();
  });
});
