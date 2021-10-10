import express from "express";

import { container } from "tsyringe";

import AdmAuthentication, {
  AdmRequest,
} from "@shared/infra/http/middlewares/AdmAuthentication";

import CreateManagerController from "../controllers/CreateManagerController";

const admRouter = express.Router();

admRouter.use((req: AdmRequest, res, next) =>
  container.resolve(AdmAuthentication).execute(req, res, next)
);

admRouter.post("/", (req, res) =>
  container.resolve(CreateManagerController).execute(req, res)
);

export default admRouter;
