import { Router } from "express";

import itemsRouter from "@modules/items/router";
import restaurantsRouter from "@modules/restaurants/router";
import sessionsRouter from "@modules/sessions/router";
import tablesRouter from "@modules/tables/router";
import usersRouter from "@modules/users/router";

const v1Router = Router();

v1Router.use("/v1", itemsRouter);
v1Router.use("/v1", restaurantsRouter);
v1Router.use("/v1", sessionsRouter);
v1Router.use("/v1", tablesRouter);
v1Router.use("/v1", usersRouter);

export default v1Router;
