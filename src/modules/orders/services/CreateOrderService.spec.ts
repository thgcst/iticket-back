import Session, { SessionDocument } from "@modules/sessions/schema";
import Item, { ItemDocument } from "@modules/items/schema";
import User from "@modules/users/schema";
import Table from "@modules/tables/schema";
import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Order from "../schema";
import CreateOrderService from "./CreateOrderService";

describe("Create Item Service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  let session: SessionDocument;
  let item: ItemDocument;

  beforeEach(async () => {
    await Order.deleteMany({});
    await Session.deleteMany({});
    const { id: user } = await User.create({
      name: "John",
      phone: "21999999999",
    });
    const { id: restaurant } = await Restaurant.create({ name: "Bar do Zé" });
    const { id: table } = await Table.create({ restaurant, number: 1 });

    session = await Session.create({ user, table });
    item = await Item.create({
      restaurant,
      name: "Suco de laranja",
      price: 12,
    });
  });

  it("should be able to create an item", async () => {
    const createOrder = new CreateOrderService();
    await createOrder.execute({
      items: [
        {
          item: item.id,
          quantity: 2,
        },
      ],
      session: session.id,
    });

    const get = await Order.find({});

    expect(get).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          items: [
            {
              item: item.id,
              quantity: 2,
            },
          ],
          session: session.id,
          status: "Novo",
        }),
      ])
    );

    session = await Session.findById(session.id).populate("orders").lean();

    expect(session.orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          items: [
            {
              item: item.id,
              quantity: 2,
            },
          ],
          session: session.id,
          status: "Novo",
        }),
      ])
    );
  });

  it("should not create an order", async () => {
    const createOrder = new CreateOrderService();
    const response = async () =>
      createOrder.execute({
        items: [
          {
            item: item.id,
            quantity: 2,
          },
        ],
        session: "asdasdasdasdasd",
      });

    await expect(response()).rejects.toThrow();
  });
});
