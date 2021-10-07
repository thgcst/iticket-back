import { Router } from "express";

import userRoutes from "./routes/user";

const userRouter = Router();

userRouter.use("/user/users", userRoutes);

export default userRouter;
