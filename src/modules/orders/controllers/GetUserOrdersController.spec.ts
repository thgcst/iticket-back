import { getMockReq, getMockRes } from "@jest-mock/express";

import GetUserOrdersController from "./GetUserOrdersController";

describe("Get user orders controller", () => {
  it("should clear body", async () => {
    const MockGetSessionOrdersService = { execute: jest.fn() };

    const createOrder = new GetUserOrdersController(
      MockGetSessionOrdersService
    );

    const req = getMockReq({
      sessionId: "fake_session_id",
    });
    const { res } = getMockRes();

    await createOrder.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(MockGetSessionOrdersService.execute).toHaveBeenCalledWith({
      sessionId: "fake_session_id",
    });
  });
});
