import { Router } from "express";

import userRoutes from "./routes/user";

const tablesRouter = Router();

tablesRouter.use("/user/tables", userRoutes);

export default tablesRouter;
