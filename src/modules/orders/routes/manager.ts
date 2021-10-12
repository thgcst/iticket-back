import express from "express";

import { container } from "tsyringe";

import ManagerAuthentication, {
  ManagerRequest,
} from "@shared/infra/http/middlewares/ManagerAuthentication";

import GetRestaurantOrdersController from "../controllers/GetRestaurantOrdersController";
import UpdateOrderStatusController from "../controllers/UpdateOrderStatusController";

const managerRouter = express.Router();

managerRouter.use((req: ManagerRequest, res, next) =>
  container.resolve(ManagerAuthentication).execute(req, res, next)
);

managerRouter.get("/", (req: ManagerRequest, res) =>
  container.resolve(GetRestaurantOrdersController).execute(req, res)
);

managerRouter.put("/", (req: ManagerRequest, res) =>
  container.resolve(UpdateOrderStatusController).execute(req, res)
);

export default managerRouter;
