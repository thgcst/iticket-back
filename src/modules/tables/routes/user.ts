import express from "express";

import { container } from "tsyringe";

import CreateUserController from "../controllers/CreateTableController";
import GetUserFromPhoneController from "../controllers/GetTableController";

const userRouter = express.Router();

userRouter.post("/", (req, res) =>
  container.resolve(CreateUserController).execute(req, res)
);

userRouter.get("/", (req, res) =>
  container.resolve(GetUserFromPhoneController).execute(req, res)
);

export default userRouter;
