import express from "express";

import { container } from "tsyringe";

import AdmAuthentication, {
  AdmRequest,
} from "@shared/infra/http/middlewares/AdmAuthentication";

import CreateRestaurantController from "../controllers/CreateRestaurantController";

const admRouter = express.Router();

admRouter.use((req: AdmRequest, res, next) =>
  container.resolve(AdmAuthentication).execute(req, res, next)
);

admRouter.post("/", (req, res) =>
  container.resolve(CreateRestaurantController).execute(req, res)
);

export default admRouter;
