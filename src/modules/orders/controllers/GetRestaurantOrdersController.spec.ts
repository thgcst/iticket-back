import { getMockReq, getMockRes } from "@jest-mock/express";

import GetRestaurantOrdersController from "./GetRestaurantOrdersController";

describe("Get user orders controller", () => {
  it("should clear body", async () => {
    const MockGetRestaurantOrdersService = { execute: jest.fn() };

    const createOrder = new GetRestaurantOrdersController(
      MockGetRestaurantOrdersService
    );

    const req = getMockReq({
      restaurantId: "fake_restaurant_id",
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockGetRestaurantOrdersService.execute).toHaveBeenCalledWith({
      restaurantId: "fake_restaurant_id",
    });
  });
});
