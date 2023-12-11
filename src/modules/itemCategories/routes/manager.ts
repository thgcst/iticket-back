import express from "express";

import { container } from "tsyringe";

import ManagerAuthentication, {
  ManagerRequest,
} from "@shared/infra/http/middlewares/ManagerAuthentication";

import CreateItemController from "../controllers/CreateItemDescriptionController";

const managerRouter = express.Router();

managerRouter.use((req: ManagerRequest, res, next) =>
  container.resolve(ManagerAuthentication).execute(req, res, next)
);

managerRouter.post("/", (req: ManagerRequest, res) =>
  container.resolve(CreateItemController).execute(req, res)
);

export default managerRouter;
