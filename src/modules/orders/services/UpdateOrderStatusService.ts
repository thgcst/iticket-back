import Order, { OrderDocument } from "../schema";

type Request = string;
type Response = OrderDocument;

export default class UpdateOrderStatusService {
  async execute(orderId: Request): Promise<Response> {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found.");
    }

    let newStatus: "Preparando" | "Pronto";

    switch (order.status) {
      case "Enviado":
        newStatus = "Preparando";
        break;
      case "Preparando":
        newStatus = "Pronto";
        break;
      default:
        throw new Error(
          'Status is already "Pronto", therefore it cannot be updated'
        );
    }

    order.status = newStatus;

    await order.save();

    return order;
  }
}
