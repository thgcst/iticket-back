import Order, { OrderDocument } from "../schema";

type Request = {
  restaurantId: string;
};

type Response = OrderDocument[];

export default class GetRestaurantOrdersService {
  async execute({ restaurantId }: Request): Promise<Response> {
    const orders = await Order.find({
      restaurant: restaurantId,
      // status: { $ne: "Pronto" },
    })
      .sort("updatedAt")
      .populate("items.item");

    return orders;
  }
}
