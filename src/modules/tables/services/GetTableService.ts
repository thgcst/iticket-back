import Table, { TableDocument } from "@modules/tables/schema";

interface Request {
  tableId: string;
}

type Response = TableDocument;

export default class GetTableService {
  async execute({ tableId }: Request): Promise<Response> {
    const table = await Table.findById(tableId);
    if (!table) {
      throw new Error("Table not found.");
    }
    return table;
  }
}
