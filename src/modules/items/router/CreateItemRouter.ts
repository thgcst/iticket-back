import { Request, Response } from "express";

import * as Yup from "yup";

import CreateRestaurantService from "../services/CreateItemService";

export default class CreateRestaurantRouter {
  createRestaurantService: CreateRestaurantService;

  constructor(createRestaurantService: CreateRestaurantService) {
    this.createRestaurantService = createRestaurantService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
      description: Yup.string(),
      price: Yup.number().required(),
      image: Yup.string(),
      restaurant: Yup.string().required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createRestaurantService.execute(body);

      return res.send(200).json(result);
    } catch (error) {
      return res.send(400).json({ error: error.message });
    }
  }
}
