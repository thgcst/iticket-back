import { Response } from "express";

import { autoInjectable } from "tsyringe";

import { ManagerRequest } from "@shared/infra/http/middlewares/ManagerAuthentication";

import GetRestaurantOrdersService from "../services/GetRestaurantOrdersService";

@autoInjectable()
export default class GetRestaurantOrdersController {
  getRestaurantOrdersService: GetRestaurantOrdersService;

  constructor(getRestaurantOrdersService: GetRestaurantOrdersService) {
    this.getRestaurantOrdersService = getRestaurantOrdersService;
  }

  async execute(req: ManagerRequest, res: Response) {
    try {
      const result = await this.getRestaurantOrdersService.execute({
        restaurantId: req.restaurantId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
