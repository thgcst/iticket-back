import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import CreateUserService from "../services/CreateUserService";

@autoInjectable()
export default class CreateRestaurantRouter {
  createUserService: CreateUserService;

  constructor(createUserService: CreateUserService) {
    this.createUserService = createUserService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
      phone: Yup.string()
        .transform((value) => value.replace(/\D/g, ""))
        .min(10)
        .max(11)
        .required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createUserService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
