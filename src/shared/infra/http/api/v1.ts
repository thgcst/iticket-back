import { Router } from "express";

import itemsRouter from "@modules/items/router";
import restaurantsRouter from "@modules/restaurants/router";
import usersRouter from "@modules/users/routes";

const v1Router = Router();

v1Router.use("/v1", itemsRouter);
v1Router.use("/v1", restaurantsRouter);
v1Router.use("/v1/users", usersRouter);

export default v1Router;
