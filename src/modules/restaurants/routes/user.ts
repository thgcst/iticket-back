import express from "express";

import { container } from "tsyringe";

import GetRestaurantController from "../controllers/GetRestaurantController";

const userRouter = express.Router();

userRouter.get("/", (req, res) =>
  container.resolve(GetRestaurantController).execute(req, res)
);

export default userRouter;
