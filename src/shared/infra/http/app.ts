import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";

import express from "express";

import cors from "cors";

import TokenError from "@shared/errors/TokenError";

import routes from "./api/v1";

if (process.env.NODE_ENV !== "test") {
  import("@shared/infra/mongoose/connection");
}

const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count", "X-Total-Page"],
  })
);
app.use(routes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ) => {
    if (err instanceof TokenError) {
      return res.status(401).json({
        code: "token.error",
        message: err.message,
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
);

export default app;
