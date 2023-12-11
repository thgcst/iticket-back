import { Router } from "express";

import managerRoutes from "./routes/manager";

const itemCategoriesRouter = Router();

itemCategoriesRouter.use("/manager/item_categories", managerRoutes);

export default itemCategoriesRouter;
