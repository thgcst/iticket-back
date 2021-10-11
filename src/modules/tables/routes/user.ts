import express from "express";

import { container } from "tsyringe";

import GetTableController from "../controllers/GetTableController";

const userRouter = express.Router();

userRouter.get("/", (req, res) =>
  container.resolve(GetTableController).execute(req, res)
);

export default userRouter;
