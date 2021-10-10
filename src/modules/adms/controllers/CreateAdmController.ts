import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import CreateAdmService from "../services/CreateAdmService";

@autoInjectable()
export default class CreateAdmController {
  createAdmService: CreateAdmService;

  constructor(createAdmService: CreateAdmService) {
    this.createAdmService = createAdmService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createAdmService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
