import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Item from "../schema";
import CreateItemController from "./CreateItemController";

describe("Create item router", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Item.deleteMany();
  });

  it("should clear body", async () => {
    const MockCreateItemService = { execute: jest.fn() };

    const createItem = new CreateItemController(MockCreateItemService);

    const req = getMockReq({
      body: {
        name: "Suqueria",
        price: 123,
        itemCategory: "615f20456c426960831eea7b",
        unusedProp: "asd",
      },
      restaurantId: "615f20456c426960831eea7b",
    });
    const { res } = getMockRes();

    await createItem.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateItemService.execute).toHaveBeenCalledWith({
      name: "Suqueria",
      price: 123,
      restaurant: "615f20456c426960831eea7b",
      itemCategory: "615f20456c426960831eea7b",
    });
  });

  it("should return validation error", async () => {
    const MockCreateItemService = { execute: jest.fn() };

    const createItem = new CreateItemController(MockCreateItemService);

    const req = getMockReq({
      body: { name: "Suqueria" },
    });
    const { res } = getMockRes();

    await createItem.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateItemService.execute).not.toBeCalled();
  });
});
