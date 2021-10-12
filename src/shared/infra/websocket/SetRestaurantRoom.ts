import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { autoInjectable } from "tsyringe";

import GetManagerRestaurantService from "@modules/managers/services/GetManagerRestaurantService";

import authConfig from "@config/auth";

@autoInjectable()
export default class setRestaurantRoom {
  getManagerRestaurantService: GetManagerRestaurantService;

  constructor(getManagerRestaurantService: GetManagerRestaurantService) {
    this.getManagerRestaurantService = getManagerRestaurantService;
  }

  execute(io: Socket) {
    io.on("joinRestaurantRoom", async (token: string) => {
      try {
        const decoded = jwt.verify(token, authConfig.manager.secret) as {
          managerId: string;
        };

        const restaurantId = await this.getManagerRestaurantService.execute(
          decoded.managerId
        );

        console.log("   --> Restaurant", restaurantId);

        io.join(restaurantId);
      } catch (error) {
        io.emit("exception", { error: "Invalid token" });
      }
    });
  }
}
