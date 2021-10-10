import { Router } from "express";

import admRoutes from "./routes/adm";
import managerRoutes from "./routes/manager";

const managersRouter = Router();

managersRouter.use("/adm/managers", admRoutes);
managersRouter.use("/manager/managers", managerRoutes);

export default managersRouter;
