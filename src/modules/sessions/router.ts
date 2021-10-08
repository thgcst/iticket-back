import { Router } from "express";

import userRoutes from "./routes/user";

const sessionsRouter = Router();

sessionsRouter.use("/user/sessions", userRoutes);

export default sessionsRouter;
