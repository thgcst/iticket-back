import { Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import { ManagerRequest } from "@shared/infra/http/middlewares/ManagerAuthentication";

import CreateItemCategoryService from "../services/CreateItemCategoryService";

@autoInjectable()
export default class CreateItemCategoryController {
  createItemCategoryService: CreateItemCategoryService;

  constructor(createItemCategoryService: CreateItemCategoryService) {
    this.createItemCategoryService = createItemCategoryService;
  }

  async execute(req: ManagerRequest, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
      order: Yup.number().required(),
      description: Yup.string(),
      image: Yup.string(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createItemCategoryService.execute({
        ...body,
        restaurant: req.restaurantId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
