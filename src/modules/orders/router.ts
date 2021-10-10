import { Router } from "express";

import userRoutes from "./routes/user";

const ordersRouter = Router();

ordersRouter.use("/user/orders", userRoutes);

export default ordersRouter;
