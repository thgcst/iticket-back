import express from "express";

import { container } from "tsyringe";

import CreateItemRouter from "./router/CreateItemRouter";
import GetItemsOfRestaurantRouter from "./router/GetItemsOfRestaurantRouter";

const itemRouter = express.Router();

itemRouter.post("/", (req, res) =>
  container.resolve(CreateItemRouter).execute(req, res)
);

itemRouter.get("/", (req, res) =>
  container.resolve(GetItemsOfRestaurantRouter).execute(req, res)
);

export default itemRouter;
