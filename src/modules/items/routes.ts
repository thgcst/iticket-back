import express from "express";

import { container } from "tsyringe";

import CreateItemRouter from "./router/CreateItemRouter";

const itemRouter = express.Router();

itemRouter.post("/", container.resolve(CreateItemRouter).execute);

export default itemRouter;
