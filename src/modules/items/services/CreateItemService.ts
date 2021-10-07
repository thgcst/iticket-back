import Restaurant from "@modules/restaurants/schema";

import Item, { ItemDocument, ItemAttributes } from "../schema";

type Request = ItemAttributes;

type Response = ItemDocument;

export default class CreateItemService {
  async execute(data: Request): Promise<Response> {
    const item = await Item.create(data);

    await Restaurant.findByIdAndUpdate(
      data.restaurant,
      {
        $addToSet: { items: item._id },
      },
      { upsert: true }
    );

    return item;
  }
}
