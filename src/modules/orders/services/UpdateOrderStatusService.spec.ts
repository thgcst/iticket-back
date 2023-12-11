import { faker } from "@faker-js/faker";

import ItemCategory from "@modules/itemCategories/schema";
import Item from "@modules/items/schema";
import Restaurant from "@modules/restaurants/schema";
import Session from "@modules/sessions/schema";
import Table from "@modules/tables/schema";
import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

import Order from "../schema";
import UpdateOrderStatusService from "./UpdateOrderStatusService";

describe("Update order status service", () => {
  let restaurant: string;
  let session: string;
  let item: string;

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

    const { id: user } = await User.create({
      name: "John",
      phone: faker.phone.number(),
    });
    restaurant = (await Restaurant.create({ name: "Bar do Zé" })).id;
    const { id: itemCategory } = await ItemCategory.create({
      name: "Bebidas",
      order: 1,
      restaurant,
    });
    const { id: table } = await Table.create({ restaurant, number: 1 });

    session = (await Session.create({ user, table })).id;
    item = (
      await Item.create({
        restaurant,
        name: "Suco de laranja",
        price: 12,
        itemCategory,
      })
    ).id;
  });

  it("should be able to update an order status", async () => {
    const order = await Order.create({
      items: [
        {
          item,
          quantity: 2,
        },
      ],
      session,
      tableNumber: 1,
      restaurant,
    });

    const updateOrder = new UpdateOrderStatusService();
    await updateOrder.execute(order.id);

    let get = await Order.findById(order.id);

    expect(get).toEqual(
      expect.objectContaining({
        status: "Preparando",
      })
    );

    await updateOrder.execute(order.id);

    get = await Order.findById(order.id);

    expect(get).toEqual(
      expect.objectContaining({
        status: "Pronto",
      })
    );

    const response = async () => updateOrder.execute(order.id);

    await expect(response()).rejects.toThrow(/cannot be updated/i);
  });

  it("should not find order", async () => {
    const updateOrder = new UpdateOrderStatusService();

    const response = async () =>
      updateOrder.execute("6165efbd67ce4e45801dfeb5");

    await expect(response()).rejects.toThrow(/Order not found/i);
  });
});
