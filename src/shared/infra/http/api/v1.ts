import { Router } from "express";

import admsRouter from "@modules/adms/router";
import itemCategoriesRouter from "@modules/itemCategories/router";
import itemsRouter from "@modules/items/router";
import managersRouter from "@modules/managers/router";
import ordersRouter from "@modules/orders/router";
import restaurantsRouter from "@modules/restaurants/router";
import sessionsRouter from "@modules/sessions/router";
import tablesRouter from "@modules/tables/router";
import usersRouter from "@modules/users/router";

const v1Router = Router();

v1Router.use("/v1", admsRouter);
v1Router.use("/v1", itemsRouter);
v1Router.use("/v1", managersRouter);
v1Router.use("/v1", restaurantsRouter);
v1Router.use("/v1", sessionsRouter);
v1Router.use("/v1", tablesRouter);
v1Router.use("/v1", usersRouter);
v1Router.use("/v1", ordersRouter);
v1Router.use("/v1", itemCategoriesRouter);

export default v1Router;
