import express from "express";

import { container } from "tsyringe";

import UserAuthentication, {
  UserRequest,
} from "@shared/infra/http/middlewares/UserAuthentication";

import CreateOrderController from "../controllers/CreateOrderController";
import GetUserOrdersController from "../controllers/GetUserOrdersController";

const userRouter = express.Router();

userRouter.use((req: UserRequest, res, next) =>
  container.resolve(UserAuthentication).execute(req, res, next)
);

userRouter.post("/", (req: UserRequest, res) =>
  container.resolve(CreateOrderController).execute(req, res)
);

userRouter.get("/", (req: UserRequest, res) =>
  container.resolve(GetUserOrdersController).execute(req, res)
);

export default userRouter;
