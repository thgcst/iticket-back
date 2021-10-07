import { Router } from "express";

import userRoutes from "./routes/user";

const itemsRouter = Router();

itemsRouter.use("/user/items", userRoutes);

export default itemsRouter;
