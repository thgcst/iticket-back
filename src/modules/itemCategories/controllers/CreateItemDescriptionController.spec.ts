import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import Item from "../schema";
import CreateItemDescriptionController from "./CreateItemDescriptionController";

describe("Create item router", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Item.deleteMany({});
  });

  it("should clear body", async () => {
    const MockCreateItemService = { execute: jest.fn() };

    const createItem = new CreateItemDescriptionController(
      MockCreateItemService
    );

    const req = getMockReq({
      body: {
        name: "Suqueria",
        order: 1,
        unusedProp: "asd",
      },
      restaurantId: "615f20456c426960831eea7b",
    });
    const { res } = getMockRes();

    await createItem.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateItemService.execute).toHaveBeenCalledWith({
      name: "Suqueria",
      order: 1,
      restaurant: "615f20456c426960831eea7b",
    });
  });

  it("should return validation error", async () => {
    const MockCreateItemService = { execute: jest.fn() };

    const createItem = new CreateItemDescriptionController(
      MockCreateItemService
    );

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
