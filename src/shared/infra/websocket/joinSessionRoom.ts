import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { autoInjectable } from "tsyringe";

import GetManagerRestaurantService from "@modules/managers/services/GetManagerRestaurantService";
import Order from "@modules/orders/schema";

import authConfig from "@config/auth";

@autoInjectable()
export default class joinSessionRoom {
  getManagerRestaurantService: GetManagerRestaurantService;

  constructor(getManagerRestaurantService: GetManagerRestaurantService) {
    this.getManagerRestaurantService = getManagerRestaurantService;
  }

  execute(io: Socket) {
    io.on("joinSessionRoom", async (token: string) => {
      try {
        const decoded = jwt.verify(token, authConfig.user.secret) as {
          sessionId: string;
        };

        const { sessionId } = decoded;

        console.log("   --> Session", sessionId);

        io.join(sessionId);

        const orders = await Order.find({ session: sessionId })
          .sort("updatedAt")
          .populate("items.item");

        io.to(sessionId).emit("orders", orders);
      } catch (error) {
        io.emit("exception", { error: "Invalid token" });
      }
    });
  }
}
