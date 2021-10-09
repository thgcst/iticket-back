import express from "express";

import { container } from "tsyringe";

import userAuthentication, {
  UserRequest,
} from "@shared/infra/http/middlewares/userAuthentication";

import CreateOrderController from "../controllers/CreateOrderController";

const itemRouter = express.Router();

itemRouter.use(userAuthentication);

itemRouter.post("/", (req: UserRequest, res) =>
  container.resolve(CreateOrderController).execute(req, res)
);

export default itemRouter;
