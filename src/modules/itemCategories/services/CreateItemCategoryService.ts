import Restaurant from "@modules/restaurants/schema";

import ItemCategory, {
  ItemCategoryDocument,
  ItemCategoryAttributes,
} from "../schema";

type Request = ItemCategoryAttributes;

type Response = ItemCategoryDocument;

export default class CreateItemCategoryService {
  async execute(data: Request): Promise<Response> {
    const itemCategory = await ItemCategory.create(data);

    const restaurant = await Restaurant.findByIdAndUpdate(
      data.restaurant,
      {
        $addToSet: { itemCategories: itemCategory._id },
      },
      { upsert: true }
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return itemCategory;
  }
}
