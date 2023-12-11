import ItemCategory from "@modules/itemCategories/schema";
import Restaurant from "@modules/restaurants/schema";

import Item, { ItemDocument, ItemAttributes } from "../schema";

type Request = ItemAttributes;

type Response = ItemDocument;

export default class CreateItemService {
  async execute(data: Request): Promise<Response> {
    const item = await Item.create(data);

    const restaurant = await Restaurant.findByIdAndUpdate(
      data.restaurant,
      {
        $addToSet: { items: item._id },
      },
      { upsert: true }
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const itemCategory = await ItemCategory.findByIdAndUpdate(
      data.itemCategory,
      {
        $addToSet: { items: item._id },
      },
      { upsert: true }
    );

    if (!itemCategory) {
      throw new Error("Item category not found");
    }

    return item;
  }
}
