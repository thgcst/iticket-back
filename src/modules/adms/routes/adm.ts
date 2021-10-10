import express from "express";

import { container } from "tsyringe";

import CreateUserController from "../controllers/CreateAdmController";
import SignInAdmController from "../controllers/SignInAdmController";

const admRouter = express.Router();

admRouter.post("/signUp", (req, res) =>
  container.resolve(CreateUserController).execute(req, res)
);

admRouter.post("/signIn", (req, res) =>
  container.resolve(SignInAdmController).execute(req, res)
);

export default admRouter;
