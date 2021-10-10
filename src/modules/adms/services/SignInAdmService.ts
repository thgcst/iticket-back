import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LeanDocument, Document } from "mongoose";

import Adm, { AdmDocument } from "@modules/adms/schema";

import authConfig from "@config/auth";

interface Request {
  email: string;
  password: string;
}

type Response = LeanDocument<
  Document<any, any, any> & Omit<AdmDocument, "password"> & { token: string }
>;

export default class SignInAdmService {
  async execute({ email, password }: Request): Promise<Response> {
    const adm = await Adm.findOne({ email }).lean();

    if (!adm) {
      throw new Error("Invalid email/password");
    }

    const passwordMatches = await bcrypt.compare(password, adm.password);

    if (!passwordMatches) {
      throw new Error("Invalid email/password");
    }

    delete adm.password;

    const token = jwt.sign({ admId: adm.id }, authConfig.adm.secret, {
      expiresIn: authConfig.adm.expiresIn,
    });

    return { ...adm, token };
  }
}
