import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import CreateTableService from "../services/CreateTableService";

@autoInjectable()
export default class CreateRestaurantRouter {
  createTableService: CreateTableService;

  constructor(createTableService: CreateTableService) {
    this.createTableService = createTableService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      number: Yup.number().required(),
      restaurant: Yup.string().required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createTableService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
