import { Response } from "express";

import { autoInjectable } from "tsyringe";

import { UserRequest } from "@shared/infra/http/middlewares/UserAuthentication";

import GetItemsOfRestaurantService from "../services/GetItemsOfRestaurantService";

@autoInjectable()
export default class GetItemsOfRestaurantController {
  getItemsOfRestaurantService: GetItemsOfRestaurantService;

  constructor(getItemsOfRestaurantService: GetItemsOfRestaurantService) {
    this.getItemsOfRestaurantService = getItemsOfRestaurantService;
  }

  async execute(req: UserRequest, res: Response) {
    try {
      const result = await this.getItemsOfRestaurantService.execute({
        restaurantId: req.restaurantId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
