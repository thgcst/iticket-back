import { Request, Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import GetUserFromPhoneService from "../services/GetUserFromPhoneService";

@autoInjectable()
export default class GetUserFromPhoneController {
  getUserFromPhoneService: GetUserFromPhoneService;

  constructor(getUserFromPhoneService: GetUserFromPhoneService) {
    this.getUserFromPhoneService = getUserFromPhoneService;
  }

  async execute(req: Request, res: Response) {
    const schema = Yup.object().shape({
      phone: Yup.string()
        .transform((value) => value.replace(/\D/g, ""))
        .min(10)
        .max(11)
        .required(),
    });

    try {
      const query = schema.validateSync(req.query, { stripUnknown: true });

      const result = await this.getUserFromPhoneService.execute(query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
