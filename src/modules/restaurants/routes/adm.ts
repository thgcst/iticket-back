import express from "express";

import { container } from "tsyringe";

import admAuthentication from "@shared/infra/http/middlewares/admAuthentication";

import CreateRestaurantController from "../controllers/CreateRestaurantController";

const admRouter = express.Router();

admRouter.use(admAuthentication);

admRouter.post("/", (req, res) =>
  container.resolve(CreateRestaurantController).execute(req, res)
);

export default admRouter;
