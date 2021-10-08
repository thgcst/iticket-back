import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import GetTableService from "../services/GetTableService";

@autoInjectable()
export default class CreateRestaurantRouter {
  getTableService: GetTableService;

  constructor(getTableService: GetTableService) {
    this.getTableService = getTableService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      tableId: Yup.string().required(),
    });

    try {
      const query = schema.validateSync(req.query, { stripUnknown: true });

      const result = await this.getTableService.execute(query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
