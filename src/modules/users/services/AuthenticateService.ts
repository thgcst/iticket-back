import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { UserDocument } from "@modules/users/schema";

import authConfig from "@config/auth";

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: UserDocument;
}

async function AuthenticateService({
  email,
  password,
}: Request): Promise<Response> {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error("Password does not match");
  }

  return {
    token: jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
    user,
  };
}

export default AuthenticateService;
