import User, { UserDocument } from "@modules/users/schema";

interface Request {
  phone: string;
}

type Response = UserDocument;

export default class GetUserFromPhoneService {
  async execute(data: Request): Promise<Response> {
    const user = await User.findOne(data);

    return user;
  }
}
