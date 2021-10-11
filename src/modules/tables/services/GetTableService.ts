import Table, { TableDocument } from "@modules/tables/schema";

interface Request {
  tableId: string;
}

type Response = Omit<TableDocument, "restaurant"> & {
  restaurant: {
    _id: string;
    name: string;
  };
};

export default class GetTableService {
  async execute({ tableId }: Request): Promise<Response> {
    const table = (await Table.findById(tableId).populate(
      "restaurant",
      "name"
    )) as unknown as Response;
    if (!table) {
      throw new Error("Table not found.");
    }
    return table;
  }
}
