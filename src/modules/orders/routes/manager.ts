import express from "express";

import { container } from "tsyringe";

import ManagerAuthentication, {
  ManagerRequest,
} from "@shared/infra/http/middlewares/ManagerAuthentication";

import GetRestaurantOrdersController from "../controllers/GetRestaurantOrdersController";

const managerRouter = express.Router();

managerRouter.use((req: ManagerRequest, res, next) =>
  container.resolve(ManagerAuthentication).execute(req, res, next)
);

managerRouter.get("/", (req: ManagerRequest, res) =>
  container.resolve(GetRestaurantOrdersController).execute(req, res)
);

export default managerRouter;
