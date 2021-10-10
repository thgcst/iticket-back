import Item, { ItemDocument } from "@modules/items/schema";
import Restaurant from "@modules/restaurants/schema";
import Session, { SessionDocument } from "@modules/sessions/schema";
import Table from "@modules/tables/schema";
import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

import Order from "../schema";
import CreateOrderService from "./CreateOrderService";

describe("Create order service", () => {
  let session: SessionDocument;
  let item: ItemDocument;

  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Order.deleteMany({});
    await Session.deleteMany({});
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Table.deleteMany({});
    await Item.deleteMany({});

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
          item: item._id,
          quantity: 2,
        },
      ],
      session: session._id,
    });

    const get = await Order.find({});

    expect(get).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              item: item._id,
              quantity: 2,
            }),
          ]),
          session: session._id,
          status: "Novo",
        }),
      ])
    );

    session = await Session.findById(session._id).populate("orders").lean();

    expect(session.orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              item: item._id,
              quantity: 2,
            }),
          ]),
          session: session._id,
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
            item: item._id,
            quantity: 2,
          },
        ],
        session: "615fef7328a5cf98ee18106b",
      });

    await expect(response()).rejects.toThrow("Session not found");
  });
});
