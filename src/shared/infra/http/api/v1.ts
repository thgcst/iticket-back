import { Router } from "express";

// import itemsRouter from "@modules/items/routes";
import restaurantsRouter from "@modules/restaurants/routes";
import usersRouter from "@modules/users/routes";

const v1Router = Router();

// v1Router.use("/v1/items", itemsRouter);
v1Router.use("/v1/restaurants", restaurantsRouter);
v1Router.use("/v1/users", usersRouter);

export default v1Router;
