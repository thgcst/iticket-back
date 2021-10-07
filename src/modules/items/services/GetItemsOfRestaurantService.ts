import Item, { ItemDocument } from "../schema";

interface Request {
  restaurantId: string;
}

type Response = ItemDocument[];

export default class GetItemsOfRestaurantService {
  async execute({ restaurantId }: Request): Promise<Response> {
    const items = await Item.find({ restaurant: restaurantId });

    return items;
  }
}
