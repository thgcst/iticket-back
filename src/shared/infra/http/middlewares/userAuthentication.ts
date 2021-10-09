import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import authConfig from "@config/auth";

import TokenError from "@shared/errors/TokenError";

export default function userAuthentication(
  req: UserRequest,
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
    const decoded = jwt.verify(token, authConfig.user.secret) as {
      sessionId: string;
    };

    req.sessionId = decoded.sessionId;

    return next();
  } catch {
    throw new TokenError("Invalid JWT token");
  }
}

export type UserRequest = {
  sessionId: string;
} & Request;
