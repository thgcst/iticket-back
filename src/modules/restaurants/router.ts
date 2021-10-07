import { Router } from "express";

import userRoutes from "./routes/user";

const restaurantRouter = Router();

restaurantRouter.use("/user/restaurants", userRoutes);

export default restaurantRouter;
