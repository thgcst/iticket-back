import { Router } from "express";

import managerRoutes from "./routes/manager";
import userRoutes from "./routes/user";

const itemsRouter = Router();

itemsRouter.use("/manager/items", managerRoutes);
itemsRouter.use("/user/items", userRoutes);

export default itemsRouter;
