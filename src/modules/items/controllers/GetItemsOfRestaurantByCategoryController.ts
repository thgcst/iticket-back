import { Response } from "express";

import { autoInjectable } from "tsyringe";

import { UserRequest } from "@shared/infra/http/middlewares/UserAuthentication";

import GetItemsOfRestaurantByCategoryService from "../services/GetItemsOfRestaurantByCategoryService";

@autoInjectable()
export default class GetItemsOfRestaurantByCategoryController {
  getItemsOfRestaurantByCategoryService: GetItemsOfRestaurantByCategoryService;

  constructor(
    getItemsOfRestaurantByCategoryService: GetItemsOfRestaurantByCategoryService
  ) {
    this.getItemsOfRestaurantByCategoryService =
      getItemsOfRestaurantByCategoryService;
  }

  async execute(req: UserRequest, res: Response) {
    try {
      const result = await this.getItemsOfRestaurantByCategoryService.execute({
        restaurantId: req.restaurantId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
