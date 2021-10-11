import express from "express";

import { container } from "tsyringe";

import ManagerAuthentication, {
  ManagerRequest,
} from "@shared/infra/http/middlewares/ManagerAuthentication";

import CreateTableController from "../controllers/CreateTableController";

const managerRouter = express.Router();

managerRouter.use((req: ManagerRequest, res, next) =>
  container.resolve(ManagerAuthentication).execute(req, res, next)
);

managerRouter.post("/", (req: ManagerRequest, res) =>
  container.resolve(CreateTableController).execute(req, res)
);

export default managerRouter;
