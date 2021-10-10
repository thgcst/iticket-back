import express from "express";

import { container } from "tsyringe";

import CreateUserController from "../controllers/CreateAdmController";
// import GetUserFromPhoneController from "../controllers/GetUserFromPhoneController";

const admRouter = express.Router();

// admRouter.get("/", (req, res) =>
//   container.resolve(GetUserFromPhoneController).execute(req, res)
// );

admRouter.post("/signup", (req, res) =>
  container.resolve(CreateUserController).execute(req, res)
);

export default admRouter;
