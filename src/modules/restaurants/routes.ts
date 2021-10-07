import express from "express";

import { container } from "tsyringe";

import CreateRestaurantController from "./controllers/CreateRestaurantController";
import GetRestaurantController from "./controllers/GetRestaurantController";

const restaurantRouter = express.Router();

restaurantRouter.post("/", (req, res) =>
  container.resolve(CreateRestaurantController).execute(req, res)
);

restaurantRouter.get("/", (req, res) =>
  container.resolve(GetRestaurantController).execute(req, res)
);

export default restaurantRouter;
