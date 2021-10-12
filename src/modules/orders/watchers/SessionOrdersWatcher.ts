import { Socket } from "socket.io";
import { autoInjectable } from "tsyringe";

import GetSessionRestaurantService from "@modules/sessions/services/GetSessionRestaurantService";

import Order from "../schema";

@autoInjectable()
export default class SessionOrdersWatcher {
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

      const orders = await Order.find({ session })
        .sort("updatedAt")
        .populate("items.item");

      io.to(session).emit("orders", orders);
    });
  }
}
