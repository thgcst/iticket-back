import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import GetRestaurantController from "./GetRestaurantController";

describe("Get restaurant controller", () => {
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
    const MockGetRestaurantService = {
      execute: jest.fn().mockReturnValue({ status: "success" }),
    };
    const getRestaurant = new GetRestaurantController(MockGetRestaurantService);

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
    expect(MockGetRestaurantService.execute).toHaveBeenCalledWith({
      restaurantId: String(createdRestaurant._id),
    });
  });

  it("should return validation error", async () => {
    const MockCreateRestaurantService = { execute: jest.fn() };

    const createRestaurant = new GetRestaurantController(
      MockCreateRestaurantService
    );

    const req = getMockReq({});
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateRestaurantService.execute).not.toBeCalled();
  });
});
