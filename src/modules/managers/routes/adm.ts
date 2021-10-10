import express from "express";

import { container } from "tsyringe";

import admAuthentication from "@shared/infra/http/middlewares/admAuthentication";

import CreateManagerController from "../controllers/CreateManagerController";

const admRouter = express.Router();

admRouter.use(admAuthentication);

admRouter.post("/", (req, res) =>
  container.resolve(CreateManagerController).execute(req, res)
);

export default admRouter;
