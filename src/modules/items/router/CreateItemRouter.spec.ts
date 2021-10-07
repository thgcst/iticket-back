import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import CreateItemRouter from "./CreateItemRouter";

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
    const createdRestaurant = await Restaurant.create({ name: "Suqueria" });
    const MockCreateItemService = { execute: jest.fn() };

    const createRestaurant = new CreateItemRouter(MockCreateItemService);

    const req = getMockReq({
      body: {
        name: "Suqueria",
        price: 123,
        restaurant: createdRestaurant._id,
        unusedProp: "asd",
      },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateItemService.execute).toHaveBeenCalledWith({
      name: "Suqueria",
      price: 123,
      restaurant: String(createdRestaurant._id),
    });
  });

  it("should return validation error", async () => {
    const MockCreateItemService = { execute: jest.fn() };

    const createRestaurant = new CreateItemRouter(MockCreateItemService);

    const req = getMockReq({
      body: { name: "Suqueria" },
    });
    const { res } = getMockRes();

    await createRestaurant.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateItemService.execute).not.toBeCalled();
  });

  // it("should return validation error", async () => {
  //   const MockCreateRestauranteService = { execute: jest.fn() };

  //   const createRestaurant = new CreateItemRouter(
  //     MockCreateRestauranteService
  //   );

  //   const req = getMockReq({
  //     body: { name: "Su" },
  //   });
  //   const { res } = getMockRes();

  //   await createRestaurant.execute(req, res);

  //   expect(res.status).toBeCalledWith(400);
  //   expect(res.json).toBeCalled();
  //   expect(MockCreateRestauranteService.execute).not.toBeCalled();
  // });
});
