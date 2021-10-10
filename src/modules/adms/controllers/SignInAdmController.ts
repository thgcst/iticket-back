import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import SignInAdmService from "../services/SignInAdmService";

@autoInjectable()
export default class SignInAdmController {
  signInAdmService: SignInAdmService;

  constructor(signInAdmService: SignInAdmService) {
    this.signInAdmService = signInAdmService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.signInAdmService.execute(body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
