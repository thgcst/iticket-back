import express from "express";

import { container } from "tsyringe";

import userAuthentication from "@shared/infra/http/middlewares/userAuthentication";

import GetItemsOfRestaurantController from "../controllers/GetItemsOfRestaurantController";

const userRouter = express.Router();

userRouter.use(userAuthentication);

userRouter.get("/", (req, res) =>
  container.resolve(GetItemsOfRestaurantController).execute(req, res)
);

export default userRouter;
