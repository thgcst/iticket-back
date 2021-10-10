import { Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import { ManagerRequest } from "@shared/infra/http/middlewares/ManagerAuthentication";

import CreateItemService from "../services/CreateItemService";

@autoInjectable()
export default class CreateItemController {
  createItemService: CreateItemService;

  constructor(createItemService: CreateItemService) {
    this.createItemService = createItemService;
  }

  async execute(req: ManagerRequest, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
      description: Yup.string(),
      price: Yup.number().required(),
      image: Yup.string(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createItemService.execute({
        ...body,
        restaurant: req.restaurantId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
