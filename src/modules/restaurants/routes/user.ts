import express from "express";

import { container } from "tsyringe";

import CreateRestaurantController from "../controllers/CreateRestaurantController";
import GetRestaurantController from "../controllers/GetRestaurantController";

const userRouter = express.Router();

userRouter.post("/", (req, res) =>
  container.resolve(CreateRestaurantController).execute(req, res)
);

userRouter.get("/", (req, res) =>
  container.resolve(GetRestaurantController).execute(req, res)
);

export default userRouter;
