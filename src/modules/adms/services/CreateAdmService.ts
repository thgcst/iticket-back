import bcrypt from "bcryptjs";
import { LeanDocument, Document } from "mongoose";

import Adm, { AdmDocument } from "@modules/adms/schema";

interface Request {
  email: string;
  password: string;
}

type Response = LeanDocument<
  Document<any, any, any> & Omit<AdmDocument, "password">
>;

export default class CreateAdmService {
  async execute({ email, password }: Request): Promise<Response> {
    const passwordHash = await bcrypt.hash(password, 8);

    const { id } = await Adm.create({ email, password: passwordHash });

    const adm = await Adm.findById(id).lean();

    delete adm.password;

    return adm;
  }
}
