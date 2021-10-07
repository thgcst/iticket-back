import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import CreateRestaurantService from "../services/CreateRestaurantService";

@autoInjectable()
export default class CreateRestaurantRouter {
  createRestaurantService: CreateRestaurantService;

  constructor(createRestaurantService: CreateRestaurantService) {
    this.createRestaurantService = createRestaurantService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createRestaurantService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
