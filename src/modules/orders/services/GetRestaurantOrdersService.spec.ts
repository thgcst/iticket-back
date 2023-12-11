import ItemCategory from "@modules/itemCategories/schema";
import Item from "@modules/items/schema";
import Restaurant from "@modules/restaurants/schema";
import Session from "@modules/sessions/schema";
import Table from "@modules/tables/schema";
import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

import Order from "../schema";
import GetRestaurantOrdersService from "./GetRestaurantOrdersService";

describe("Get restaurant orders service", () => {
  let restaurant1: string;
  let restaurant2: string;
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

    restaurant1 = (await Restaurant.create({ name: "Bar do Zé" })).id;
    restaurant2 = (await Restaurant.create({ name: "Madero" })).id;

    const { id: itemCategory1 } = await ItemCategory.create({
      name: "Bebidas",
      order: 1,
      restaurant: restaurant1,
    });

    const { id: itemCategory2 } = await ItemCategory.create({
      name: "Aperitivos",
      order: 2,
      restaurant: restaurant2,
    });

    const { id: table1 } = await Table.create({
      restaurant: restaurant1,
      number: 1,
    });
    const { id: table2 } = await Table.create({
      restaurant: restaurant2,
      number: 1,
    });

    const { id: session1 } = await Session.create({
      user: user1,
      table: table1,
    });
    const { id: session2 } = await Session.create({
      user: user2,
      table: table2,
    });

    const { id: item1 } = await Item.create({
      restaurant: restaurant1,
      name: "Suco de laranja",
      price: 12,
      itemCategory: itemCategory1,
    });
    const { id: item2 } = await Item.create({
      restaurant: restaurant2,
      name: "Suco de laranja",
      price: 12,
      itemCategory: itemCategory2,
    });

    await Order.create({
      items: [
        {
          item: item1,
          quantity: 2,
        },
      ],
      session: session1,
      restaurant: restaurant1,
    });
    await Order.create({
      items: [
        {
          item: item2,
          quantity: 5,
        },
      ],
      session: session2,
      restaurant: restaurant2,
    });
    await Order.create({
      items: [
        {
          item: item2,
          quantity: 1,
        },
      ],
      session: session2,
      restaurant: restaurant2,
    });
  });

  it("should be able to get restaurant orders", async () => {
    const getRestaurantOrders = new GetRestaurantOrdersService();
    const restaurant1Orders = await getRestaurantOrders.execute({
      restaurantId: restaurant1,
    });
    const restaurant2Orders = await getRestaurantOrders.execute({
      restaurantId: restaurant2,
    });

    expect(restaurant1Orders.length).toBe(1);
    expect(restaurant2Orders.length).toBe(2);
  });
});
