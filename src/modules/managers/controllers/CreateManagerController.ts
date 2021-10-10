import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import CreateManagerService from "../services/CreateManagerService";

@autoInjectable()
export default class CreateManagerController {
  createManagerService: CreateManagerService;

  constructor(createManagerService: CreateManagerService) {
    this.createManagerService = createManagerService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      restaurant: Yup.string().required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createManagerService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
