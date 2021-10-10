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

    return item;
  }
}
