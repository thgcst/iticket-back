import bcrypt from "bcryptjs";
import { LeanDocument, Document } from "mongoose";

import Manager, { ManagerDocument } from "@modules/managers/schema";
import Restaurant from "@modules/restaurants/schema";

interface Request {
  email: string;
  password: string;
  restaurant: string;
}

type Response = LeanDocument<
  Document<any, any, any> & Omit<ManagerDocument, "password">
>;

export default class CreateManagerService {
  async execute({
    email,
    password,
    restaurant: restaurantId,
  }: Request): Promise<Response> {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const { id } = await Manager.create({
      email,
      password: passwordHash,
      restaurant: restaurantId,
    });

    await Restaurant.findByIdAndUpdate(restaurantId, {
      $addToSet: { managers: id },
    });

    const manager = await Manager.findById(id).lean();

    delete manager.password;

    return manager;
  }
}
