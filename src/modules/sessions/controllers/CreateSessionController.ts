import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import CreateSessionService from "../services/CreateSessionService";

@autoInjectable()
export default class CreateSessionController {
  createSessionService: CreateSessionService;

  constructor(createSessionService: CreateSessionService) {
    this.createSessionService = createSessionService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3),
      phone: Yup.string()
        .transform((value) => value.replace(/\D/g, ""))
        .min(10)
        .max(11)
        .required(),
      table: Yup.string().required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createSessionService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
