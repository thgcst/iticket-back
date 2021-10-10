import { getMockReq, getMockRes } from "@jest-mock/express";

import CreateOrderController from "./CreateOrderController";

describe("Create order controller", () => {
  it("should clear body", async () => {
    const MockCreateOrderService = { execute: jest.fn() };

    const createOrder = new CreateOrderController(MockCreateOrderService);

    const req = getMockReq({
      body: {
        items: [
          {
            item: "item_id",
            quantity: 10,
          },
        ],
      },
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockCreateOrderService.execute).toHaveBeenCalledWith({
      items: [
        {
          item: "item_id",
          quantity: 10,
        },
      ],
    });
  });

  it("should return validation error for empty items array", async () => {
    const MockCreateOrderService = { execute: jest.fn() };

    const createOrder = new CreateOrderController(MockCreateOrderService);

    const req = getMockReq({
      body: { items: [] },
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateOrderService.execute).not.toBeCalled();
  });

  it("should return validation error for items without quantity", async () => {
    const MockCreateOrderService = { execute: jest.fn() };

    const createOrder = new CreateOrderController(MockCreateOrderService);

    const req = getMockReq({
      body: {
        items: [
          {
            item: "item_id",
          },
          {
            item: "item_id",
          },
        ],
      },
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockCreateOrderService.execute).not.toBeCalled();
  });
});
