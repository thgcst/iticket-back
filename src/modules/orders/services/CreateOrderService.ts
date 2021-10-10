import Session from "@modules/sessions/schema";

import Order, { OrderDocument } from "../schema";

type Request = {
  items: {
    item: string;
    quantity: number;
  }[];
  session: string;
};

type Response = OrderDocument;

export default class CreateOrderService {
  async execute(data: Request): Promise<Response> {
    const order = await Order.create(data);

    const session = await Session.findByIdAndUpdate(
      data.session,
      {
        $addToSet: { orders: order._id },
      },
      { upsert: true }
    );

    if (!session) {
      throw new Error("Session not found");
    }

    return order;
  }
}
