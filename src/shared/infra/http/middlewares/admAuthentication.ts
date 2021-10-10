import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import authConfig from "@config/auth";

import TokenError from "@shared/errors/TokenError";

export default function admAuthentication(
  req: AdmRequest,
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
    const decoded = jwt.verify(token, authConfig.adm.secret) as {
      admId: string;
    };

    req.admId = decoded.admId;

    return next();
  } catch {
    throw new TokenError("Invalid JWT token");
  }
}

export type AdmRequest = {
  admId: string;
} & Request;
