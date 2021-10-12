import { Socket } from "socket.io";
import { container } from "tsyringe";

import RestaurantOrdersWatcher from "@modules/orders/watchers/RestaurantOrdersWatcher";
import SessionOrdersWatcher from "@modules/orders/watchers/SessionOrdersWatcher";

import joinRestaurantRoom from "./joinRestaurantRoom";
import joinSessionRoom from "./joinSessionRoom";

const WS = (io: Socket) => {
  console.log("\n --> Socket connected", io.id);

  io.on("disconnect", () => {
    console.log("\n --> Socket disconnected", io.id);
  });

  container.resolve(joinRestaurantRoom).execute(io);
  container.resolve(joinSessionRoom).execute(io);
  container.resolve(RestaurantOrdersWatcher).execute(io);
  container.resolve(SessionOrdersWatcher).execute(io);
};

export default WS;
