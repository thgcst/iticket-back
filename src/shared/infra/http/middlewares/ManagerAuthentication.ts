import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { autoInjectable } from "tsyringe";

import GetManagerRestaurantService from "@modules/managers/services/GetManagerRestaurantService";

import authConfig from "@config/auth";

import TokenError from "@shared/errors/TokenError";

export type ManagerRequest = {
  managerId: string;
  restaurantId: string;
} & Request;
@autoInjectable()
export default class ManagerAuthentication {
  getManagerRestaurantService: GetManagerRestaurantService;

  constructor(getManagerRestaurantService: GetManagerRestaurantService) {
    this.getManagerRestaurantService = getManagerRestaurantService;
  }

  async execute(
    req: ManagerRequest,
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
      const decoded = jwt.verify(token, authConfig.manager.secret) as {
        managerId: string;
      };

      const restaurantId = await this.getManagerRestaurantService.execute(
        decoded.managerId
      );

      req.managerId = decoded.managerId;
      req.restaurantId = restaurantId;

      return next();
    } catch {
      throw new TokenError("Invalid JWT token");
    }
  }
}
