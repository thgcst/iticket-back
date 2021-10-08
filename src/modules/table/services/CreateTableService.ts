import Restaurant from "@modules/restaurants/schema";
import Table, { TableDocument } from "@modules/table/schema";

interface Request {
  number: number;
  restaurant: string;
}

type Response = TableDocument;

export default class CreateTableService {
  async execute(data: Request): Promise<Response> {
    const restaurant = await Restaurant.findById(data.restaurant);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const table = await Table.create(data);

    await Restaurant.findByIdAndUpdate(
      data.restaurant,
      {
        $addToSet: { tables: table._id },
      },
      { upsert: true }
    );

    return table;
  }
}
