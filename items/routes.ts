import express from "express";

import createItemRouter from "./router/CreateItemRouter";

const itemRouter = express.Router();

itemRouter.post("/", createItemRouter);

export default itemRouter;
