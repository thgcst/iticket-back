import jwt from "jsonwebtoken";
import { autoInjectable } from "tsyringe";

import Session, { SessionDocument } from "@modules/sessions/schema";
import Table from "@modules/tables/schema";
import GetTableService from "@modules/tables/services/GetTableService";
import User from "@modules/users/schema";
import CreateUserService from "@modules/users/services/CreateUserService";
import GetUserFromPhoneService from "@modules/users/services/GetUserFromPhoneService";

import authConfig from "@config/auth";

interface Request {
  name?: string;
  phone: string;
  table: string;
}

type Response = { session: SessionDocument; token: string };

@autoInjectable()
export default class CreateSessionService {
  createUserService: CreateUserService;

  getUserFromPhoneService: GetUserFromPhoneService;

  getTableService: GetTableService;

  constructor(
    createUserService: CreateUserService,
    getUserFromPhoneService: GetUserFromPhoneService,
    getTableService: GetTableService
  ) {
    this.createUserService = createUserService;
    this.getUserFromPhoneService = getUserFromPhoneService;
    this.getTableService = getTableService;
  }

  async execute(data: Request): Promise<Response> {
    const table = await this.getTableService.execute({ tableId: data.table });

    if (!table) {
      throw new Error("Table not found.");
    }

    let user = await this.getUserFromPhoneService.execute({
      phone: data.phone,
    });

    if (!user) {
      if (!data?.name) {
        throw new Error(
          "This phone is not registered in any user, therefore, it's name is required"
        );
      }
      user = await this.createUserService.execute({
        name: data.name,
        phone: data.phone,
      });
    }

    const actualSession = await Session.findOne({
      user: user.id,
      active: true,
    });

    if (actualSession) {
      return {
        session: actualSession,
        token: jwt.sign(
          { sessionId: actualSession._id },
          authConfig.user.secret,
          {
            expiresIn: authConfig.user.expiresIn,
          }
        ),
      };
    }

    const session = await Session.create({ user: user._id, table: table._id });

    await Table.findByIdAndUpdate(
      table._id,
      {
        $addToSet: { sessions: session._id },
      },
      { upsert: true }
    );

    await User.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { sessions: session._id },
      },
      { upsert: true }
    );

    return {
      session,
      token: jwt.sign({ sessionId: session._id }, authConfig.user.secret, {
        expiresIn: authConfig.user.expiresIn,
      }),
    };
  }
}
