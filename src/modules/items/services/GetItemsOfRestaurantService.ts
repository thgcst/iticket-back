import Restaurant from "@modules/restaurants/schema";

import Item, { ItemDocument } from "../schema";

interface Request {
  restaurantId: string;
}

type Response = ItemDocument[];

export default class GetItemsOfRestaurantService {
  async execute({ restaurantId }: Request): Promise<Response> {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const items = await Item.find({ restaurant: restaurantId }).sort({
      category: 1,
    });

    return items;
  }
}
