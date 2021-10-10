import express from "express";

import { container } from "tsyringe";

import userAuthentication, {
  UserRequest,
} from "@shared/infra/http/middlewares/userAuthentication";

import CreateOrderController from "../controllers/CreateOrderController";

const userRouter = express.Router();

userRouter.use(userAuthentication);

userRouter.post("/", (req: UserRequest, res) =>
  container.resolve(CreateOrderController).execute(req, res)
);

export default userRouter;
