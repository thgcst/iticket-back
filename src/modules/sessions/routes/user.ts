import express from "express";

import { container } from "tsyringe";

import CreateSessionController from "../controllers/CreateSessionController";

const userRouter = express.Router();

userRouter.post("/", (req, res) =>
  container.resolve(CreateSessionController).execute(req, res)
);

export default userRouter;
