import ItemCategory from "@modules/itemCategories/schema";
import Item from "@modules/items/schema";
import Restaurant from "@modules/restaurants/schema";
import Session from "@modules/sessions/schema";
import Table from "@modules/tables/schema";
import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

import Order from "../schema";
import GetSessionOrdersService from "./GetSessionOrdersService";

describe("Get session orders service", () => {
  let session1: string;
  let session2: string;
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Order.deleteMany();
    await Session.deleteMany();
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Table.deleteMany();
    await Item.deleteMany();
    await ItemCategory.deleteMany();

    const { id: user1 } = await User.create({
      name: "John1",
      phone: "21999999991",
    });
    const { id: user2 } = await User.create({
      name: "John2",
      phone: "21999999992",
    });
    const { id: restaurant } = await Restaurant.create({ name: "Bar do Zé" });
    const { id: itemCategory } = await ItemCategory.create({
      name: "Bebidas",
      order: 1,
      restaurant,
    });
    const { id: table } = await Table.create({ restaurant, number: 1 });

    session1 = (await Session.create({ user: user1, table })).id;
    session2 = (await Session.create({ user: user2, table })).id;
    const { id: item } = await Item.create({
      restaurant,
      name: "Suco de laranja",
      price: 12,
      itemCategory,
    });

    await Order.create({
      items: [
        {
          item,
          quantity: 2,
        },
      ],
      session: session1,
    });
    await Order.create({
      items: [
        {
          item,
          quantity: 5,
        },
      ],
      session: session1,
    });
    await Order.create({
      items: [
        {
          item,
          quantity: 1,
        },
      ],
      session: session2,
    });
  });

  it("should be able to get session orders", async () => {
    const getUserOrders = new GetSessionOrdersService();
    const session1Orders = await getUserOrders.execute({ sessionId: session1 });
    const session2Orders = await getUserOrders.execute({ sessionId: session2 });

    expect(session1Orders.length).toBe(2);
    expect(session2Orders.length).toBe(1);
  });
});
