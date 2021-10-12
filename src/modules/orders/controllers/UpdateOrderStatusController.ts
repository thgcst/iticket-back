import { Response } from "express";

import { autoInjectable } from "tsyringe";
import * as Yup from "yup";

import { ManagerRequest } from "@shared/infra/http/middlewares/ManagerAuthentication";

import UpdateOrderStatusService from "../services/UpdateOrderStatusService";

@autoInjectable()
export default class UpdateOrderStatusController {
  updateOrderStatusService: UpdateOrderStatusService;

  constructor(updateOrderStatusService: UpdateOrderStatusService) {
    this.updateOrderStatusService = updateOrderStatusService;
  }

  async execute(req: ManagerRequest, res: Response) {
    const schema = Yup.object().shape({
      orderId: Yup.string().required(),
    });
    try {
      const query = schema.validateSync(req.query, { stripUnknown: true });

      const result = await this.updateOrderStatusService.execute(query.orderId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
