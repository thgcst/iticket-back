import { Router } from "express";

import managerRoutes from "./routes/manager";
import userRoutes from "./routes/user";

const ordersRouter = Router();

ordersRouter.use("/manager/orders", managerRoutes);
ordersRouter.use("/user/orders", userRoutes);

export default ordersRouter;
