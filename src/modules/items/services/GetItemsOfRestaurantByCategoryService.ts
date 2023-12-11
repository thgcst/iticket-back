import ItemCategory, {
  ItemCategoryDocument,
} from "@modules/itemCategories/schema";
import Restaurant from "@modules/restaurants/schema";

import { ItemDocument } from "../schema";

interface Request {
  restaurantId: string;
}

type Response = (ItemCategoryDocument & { items: ItemDocument[] })[];

export default class GetItemsOfRestaurantByCategoryService {
  async execute({ restaurantId }: Request): Promise<Response> {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const categories = (await ItemCategory.find({
      restaurant: restaurantId,
    })
      .sort({ order: 1 })
      .populate("items")) as unknown as Response;

    return categories;
  }
}
