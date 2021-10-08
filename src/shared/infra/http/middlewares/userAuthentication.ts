import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import authConfig from "@config/auth";

import TokenError from "@shared/errors/TokenError";

export default function userAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): void | Error {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new TokenError("JWT token is missing.");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new TokenError("JWT token is missing.");
  }

  try {
    const decoded: { sessionId: string } = jwt.verify(
      token,
      authConfig.user.secret
    );

    req.sessionId = decoded.sessionId;

    return next();
  } catch {
    throw new TokenError("Invalid JWT token");
  }
}
