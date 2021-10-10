import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { autoInjectable } from "tsyringe";

import authConfig from "@config/auth";

import TokenError from "@shared/errors/TokenError";

export type AdmRequest = {
  admId: string;
  restaurantId: string;
} & Request;

@autoInjectable()
export default class AdmAuthentication {
  async execute(
    req: AdmRequest,
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
      const decoded = jwt.verify(token, authConfig.adm.secret) as {
        admId: string;
      };

      req.admId = decoded.admId;

      return next();
    } catch {
      return new TokenError("Invalid JWT token");
    }
  }
}
