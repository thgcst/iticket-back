import Restaurant, { RestaurantDocument } from "../schema";

interface Request {
  name: string;
}

type Response = RestaurantDocument;

export default class CreateRestaurantService {
  async execute({ name }: Request): Promise<Response> {
    const restaurant = await Restaurant.create({
      name,
    });

    return restaurant;
  }
}
