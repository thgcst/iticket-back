import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Item from "../schema";
import GetItemsOfRestaurantController from "./GetItemsOfRestaurantController";

describe("Get items of restaurant controller", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Item.deleteMany({});
  });

  it("should clear query", async () => {
    const MockGetItemsOfRestaurantService = { execute: jest.fn() };
    const getItemsOfRestaurant = new GetItemsOfRestaurantController(
      MockGetItemsOfRestaurantService
    );

    const req = getMockReq({
      restaurantId: "615f20456c426960831eea7b",
    });
    const { res } = getMockRes();

    await getItemsOfRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockGetItemsOfRestaurantService.execute).toHaveBeenCalledWith({
      restaurantId: "615f20456c426960831eea7b",
    });
  });
});
