import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import GetItemsOfRestaurantService from "../services/GetItemsOfRestaurantService";

@autoInjectable()
export default class GetItemsOfRestaurantController {
  getItemsOfRestaurantService: GetItemsOfRestaurantService;

  constructor(getItemsOfRestaurantService: GetItemsOfRestaurantService) {
    this.getItemsOfRestaurantService = getItemsOfRestaurantService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      restaurantId: Yup.string().required(),
    });

    try {
      const query = schema.validateSync(req.query, { stripUnknown: true });

      const result = await this.getItemsOfRestaurantService.execute(query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
