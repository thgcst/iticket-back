import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { autoInjectable } from "tsyringe";

import authConfig from "@config/auth";

import TokenError from "@shared/errors/TokenError";

export type UserRequest = {
  sessionId: string;
} & Request;

@autoInjectable()
export default class UserAuthentication {
  async execute(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void | TokenError> {
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
      return new TokenError("Invalid JWT token");
    }
  }
}
