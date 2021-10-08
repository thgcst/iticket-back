import { Router } from "express";

import userRoutes from "./routes/user";

const usersRouter = Router();

usersRouter.use("/user/users", userRoutes);

export default usersRouter;
