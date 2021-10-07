import Restaurant, { RestaurantDocument } from "../schema";

interface Request {
  restaurantId: string;
}

type Response = RestaurantDocument;

export default class CreateRestaurantService {
  async execute({ restaurantId }: Request): Promise<Response> {
    const restaurant = await Restaurant.findById(restaurantId).populate(
      "items"
    );

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    return restaurant;
  }
}
