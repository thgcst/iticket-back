import Table, { TableDocument } from "@modules/table/schema";

interface Request {
  tableId: string;
}

type Response = TableDocument;

export default class CreateTableService {
  async execute({ tableId }: Request): Promise<Response> {
    const table = await Table.findById(tableId);

    return table;
  }
}
