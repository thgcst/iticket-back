import { Response } from "express";

import { autoInjectable } from "tsyringe";

import { UserRequest } from "@shared/infra/http/middlewares/UserAuthentication";

import GetSessionOrdersService from "../services/GetSessionOrdersService";

@autoInjectable()
export default class GetSessionOrdersController {
  getSessionOrdersService: GetSessionOrdersService;

  constructor(getSessionOrdersService: GetSessionOrdersService) {
    this.getSessionOrdersService = getSessionOrdersService;
  }

  async execute(req: UserRequest, res: Response) {
    try {
      const result = await this.getSessionOrdersService.execute({
        sessionId: req.sessionId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
