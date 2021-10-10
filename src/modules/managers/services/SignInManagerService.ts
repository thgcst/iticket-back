import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LeanDocument, Document } from "mongoose";

import Manager, { ManagerDocument } from "@modules/managers/schema";

import authConfig from "@config/auth";

interface Request {
  email: string;
  password: string;
}

type Response = LeanDocument<
  Document<any, any, any> &
    Omit<ManagerDocument, "password"> & { token: string }
>;

export default class SignInManagerService {
  async execute({ email, password }: Request): Promise<Response> {
    const manager = await Manager.findOne({ email }).lean();

    if (!manager) {
      throw new Error("Invalid email/password");
    }

    const passwordMatches = await bcrypt.compare(password, manager.password);

    if (!passwordMatches) {
      throw new Error("Invalid email/password");
    }

    delete manager.password;

    const token = jwt.sign(
      { managerId: manager._id },
      authConfig.manager.secret,
      {
        expiresIn: authConfig.manager.expiresIn,
      }
    );

    return { ...manager, token };
  }
}
