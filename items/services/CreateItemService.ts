import Item, { ItemDocument } from "../schema";

interface Request {
  name: string;
  description?: string;
  price: number;
  image?: string;
  restaurant: string;
}

type Response = ItemDocument;

async function CreateItem(data: Request): Promise<Response> {
  const item = await Item.create(data);

  return item;
}

export default CreateItem;
