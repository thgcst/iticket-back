import express from "express";

import { container } from "tsyringe";

import UserAuthentication, {
  UserRequest,
} from "@shared/infra/http/middlewares/UserAuthentication";

import GetItemsOfRestaurantByCategoryController from "../controllers/GetItemsOfRestaurantByCategoryController";
import GetItemsOfRestaurantController from "../controllers/GetItemsOfRestaurantController";

const userRouter = express.Router();

userRouter.use((req: UserRequest, res, next) =>
  container.resolve(UserAuthentication).execute(req, res, next)
);

userRouter.get("/", (req: UserRequest, res) =>
  container.resolve(GetItemsOfRestaurantController).execute(req, res)
);

userRouter.get("/by_category", (req: UserRequest, res) =>
  container.resolve(GetItemsOfRestaurantByCategoryController).execute(req, res)
);

export default userRouter;
