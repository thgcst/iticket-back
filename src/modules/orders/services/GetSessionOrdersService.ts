import Order, { OrderDocument } from "../schema";

type Request = {
  sessionId: string;
};

type Response = OrderDocument[];

export default class GetSessionOrdersService {
  async execute({ sessionId }: Request): Promise<Response> {
    const order = await Order.find({ session: sessionId }).populate(
      "items.item"
    );

    return order;
  }
}
