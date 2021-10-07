import express from "express";

import { container } from "tsyringe";

import CreateRestaurantRouter from "./router/CreateRestaurantRouter";

const restaurantRouter = express.Router();

restaurantRouter.post("/", (req, res) =>
  container.resolve(CreateRestaurantRouter).execute(req, res)
);

export default restaurantRouter;
