import { Router } from "express";

import admRoutes from "./routes/adm";
import userRoutes from "./routes/user";

const restaurantsRouter = Router();

restaurantsRouter.use("/adm/restaurants", admRoutes);
restaurantsRouter.use("/user/restaurants", userRoutes);

export default restaurantsRouter;
