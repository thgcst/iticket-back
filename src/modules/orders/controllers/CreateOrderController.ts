import { Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import { UserRequest } from "@shared/infra/http/middlewares/userAuthentication";

import CreateOrderService from "../services/CreateOrderService";

@autoInjectable()
export default class CreateOrderController {
  createOrderService: CreateOrderService;

  constructor(createOrderService: CreateOrderService) {
    this.createOrderService = createOrderService;
  }

  async execute(req: UserRequest, res: Response) {
    const schema = Yup.object().shape({
      items: Yup.array()
        .of(
          Yup.object().shape({
            item: Yup.string().required(),
            quantity: Yup.number().required(),
          })
        )
        .min(1)
        .required(),
    });

    try {
      const body = schema.validateSync(req.body, { stripUnknown: true });

      const result = await this.createOrderService.execute({
        ...body,
        session: req.sessionId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
