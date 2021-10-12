import { Socket } from "socket.io";
import { autoInjectable } from "tsyringe";

import GetSessionRestaurantService from "@modules/sessions/services/GetSessionRestaurantService";

import Order from "../schema";

@autoInjectable()
export default class RestaurantOrdersWatcher {
  getSessionRestaurantService: GetSessionRestaurantService;

  constructor(getSessionRestaurantService: GetSessionRestaurantService) {
    this.getSessionRestaurantService = getSessionRestaurantService;
  }

  execute(io: Socket) {
    const changeStream = Order.watch([], { fullDocument: "updateLookup" });

    changeStream.on("change", async (change) => {
      const session = change.fullDocument?.session.toString() || "";

      if (!session) {
        return;
      }

      const restaurant = await this.getSessionRestaurantService.execute(
        session
      );

      const orders = await Order.find({ restaurant })
        .sort("updatedAt")
        .populate("items.item");

      io.to(restaurant).emit("orders", orders);
    });
  }
}
