import express from "express";

import { container } from "tsyringe";

import CreateRestaurantRouter from "./router/CreateRestaurantRouter";
import GetRestaurantRouter from "./router/GetRestaurantRouter";

const restaurantRouter = express.Router();

restaurantRouter.post("/", (req, res) =>
  container.resolve(CreateRestaurantRouter).execute(req, res)
);

restaurantRouter.get("/", (req, res) =>
  container.resolve(GetRestaurantRouter).execute(req, res)
);

export default restaurantRouter;
