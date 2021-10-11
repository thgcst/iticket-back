import { Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import { ManagerRequest } from "@shared/infra/http/middlewares/ManagerAuthentication";

import CreateTableService from "../services/CreateTableService";

@autoInjectable()
export default class CreateTableController {
  createTableService: CreateTableService;

  constructor(createTableService: CreateTableService) {
    this.createTableService = createTableService;
  }

  async execute(req: ManagerRequest, res: Response) {
    const schema = Yup.object().shape({
      number: Yup.number().required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createTableService.execute({
        ...body,
        restaurant: req.restaurantId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
