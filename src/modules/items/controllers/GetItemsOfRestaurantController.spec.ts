import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import GetItemsOfRestaurantController from "./GetItemsOfRestaurantController";

describe("Get items controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Restaurant.deleteMany({});
  });

  it("should clear query", async () => {
    const createdRestaurant = await Restaurant.create({ name: "Suqueria" });

    const MockGetItemsOfRestaurantService = { execute: jest.fn() };
    const getItemsOfRestaurant = new GetItemsOfRestaurantController(
      MockGetItemsOfRestaurantService
    );

    const req = getMockReq({
      query: {
        restaurantId: createdRestaurant._id,
      },
    });
    const { res } = getMockRes();

    await getItemsOfRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockGetItemsOfRestaurantService.execute).toHaveBeenCalledWith({
      restaurantId: String(createdRestaurant._id),
    });
  });

  it("should return validation error", async () => {
    const MockGetItemsOfRestaurantService = { execute: jest.fn() };

    const getItemsOfRestaurant = new GetItemsOfRestaurantController(
      MockGetItemsOfRestaurantService
    );

    const req = getMockReq({
      query: {},
    });
    const { res } = getMockRes();

    await getItemsOfRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockGetItemsOfRestaurantService.execute).not.toBeCalled();
  });
});
