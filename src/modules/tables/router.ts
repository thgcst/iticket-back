import { Router } from "express";

import managerRoutes from "./routes/manager";
import userRoutes from "./routes/user";

const tablesRouter = Router();

tablesRouter.use("/manager/tables", managerRoutes);
tablesRouter.use("/user/tables", userRoutes);

export default tablesRouter;
