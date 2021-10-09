import Session from "@modules/sessions/schema";

import Order, { OrderDocument, OrderAttributes } from "../schema";

interface Request extends Omit<OrderAttributes, "status"> {}

type Response = OrderDocument;

export default class CreateOrderService {
  async execute(data: Request): Promise<Response> {
    const order = await Order.create(data);

    await Session.findByIdAndUpdate(
      data.session,
      {
        $addToSet: { orders: order._id },
      },
      { upsert: true }
    );

    return order;
  }
}
