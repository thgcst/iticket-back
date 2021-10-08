import express from "express";

import { container } from "tsyringe";

import managerAuthentication from "@shared/infra/http/middlewares/managerAuthentication";

import CreateItemController from "../controllers/CreateItemController";

const itemRouter = express.Router();

itemRouter.use(managerAuthentication);

itemRouter.post("/", (req, res) =>
  container.resolve(CreateItemController).execute(req, res)
);

export default itemRouter;
