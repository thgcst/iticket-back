import express from "express";

import { container } from "tsyringe";

import CreateItemController from "./controllers/CreateItemController";
import GetItemsOfRestaurantController from "./controllers/GetItemsOfRestaurantController";

const itemRouter = express.Router();

itemRouter.post("/", (req, res) =>
  container.resolve(CreateItemController).execute(req, res)
);

itemRouter.get("/", (req, res) =>
  container.resolve(GetItemsOfRestaurantController).execute(req, res)
);

export default itemRouter;
