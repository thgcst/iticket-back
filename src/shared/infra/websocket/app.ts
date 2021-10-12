import { Socket } from "socket.io";
import { container } from "tsyringe";

import NewOrderWatcher from "@modules/orders/watchers/NewOrderWatcher";

import SetRestaurantRoom from "./SetRestaurantRoom";

const WS = (io: Socket) => {
  console.log("\n --> Socket connected", io.id);

  container.resolve(NewOrderWatcher).execute(io);
  container.resolve(SetRestaurantRoom).execute(io);
};

export default WS;
