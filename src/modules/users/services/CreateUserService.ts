import User, { UserDocument } from "@modules/users/schema";

interface Request {
  name: string;
  phone: string;
}

type Response = UserDocument;

export default class CreateUserService {
  async execute(data: Request): Promise<Response> {
    const user = await User.create(data);

    return user;
  }
}
