import { Router } from "express";

import userRoutes from "./routes/user";

const restaurantsRouter = Router();

restaurantsRouter.use("/user/restaurants", userRoutes);

export default restaurantsRouter;
