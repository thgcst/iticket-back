import express from "express";

import { container } from "tsyringe";

import SignInManagerController from "../controllers/SignInManagerController";

const managerRouter = express.Router();

managerRouter.post("/signIn", (req, res) =>
  container.resolve(SignInManagerController).execute(req, res)
);

export default managerRouter;
