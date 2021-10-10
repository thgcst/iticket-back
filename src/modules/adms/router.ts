import { Router } from "express";

import admRoutes from "./routes/adm";

const admsRouter = Router();

admsRouter.use("/adm/adms", admRoutes);

export default admsRouter;
