import express from "express";

import { container } from "tsyringe";

import userAuthentication from "@shared/infra/http/middlewares/userAuthentication";

import GetItemsOfRestaurantController from "../controllers/GetItemsOfRestaurantController";

const itemRouter = express.Router();

itemRouter.use(userAuthentication);

itemRouter.get("/", (req, res) =>
  container.resolve(GetItemsOfRestaurantController).execute(req, res)
);

export default itemRouter;
