import { createServer } from "http";
import { Server } from "socket.io";

import app from "./http/app";
import WS from "./websocket/app";

const port = process.env.PORT || 3333;

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", WS);

httpServer.listen(port, () => {
  console.log(`⚡️ Server listening on http://localhost:${port}`);
});
