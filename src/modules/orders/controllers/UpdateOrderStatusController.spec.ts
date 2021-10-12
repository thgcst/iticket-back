import { getMockReq, getMockRes } from "@jest-mock/express";

import UpdateOrderStatusController from "./UpdateOrderStatusController";

describe("Get user orders controller", () => {
  it("should clear body", async () => {
    const MockUpdateOrderStatusService = { execute: jest.fn() };

    const createOrder = new UpdateOrderStatusController(
      MockUpdateOrderStatusService
    );

    const req = getMockReq({
      query: {
        orderId: "fake_order_id",
      },
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockUpdateOrderStatusService.execute).toHaveBeenCalledWith(
      "fake_order_id"
    );
  });

  it("should return validation error", async () => {
    const MockUpdateOrderStatusService = { execute: jest.fn() };

    const createOrder = new UpdateOrderStatusController(
      MockUpdateOrderStatusService
    );

    const req = getMockReq({
      query: {},
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
    expect(MockUpdateOrderStatusService.execute).not.toBeCalled();
  });
});
