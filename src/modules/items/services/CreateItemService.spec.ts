import ItemCategory from "@modules/itemCategories/schema";
import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Item from "../schema";
import CreateItemService from "./CreateItemService";

describe("Create Item Service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Item.deleteMany();
    await ItemCategory.deleteMany();
    await Restaurant.deleteMany();
  });

  it("should be able to create an item", async () => {
    let restaurant = await Restaurant.create({ name: "Suqueria" });
    const category = await ItemCategory.create({
      name: "Suqueria",
      order: 1,
      restaurant: String(restaurant._id),
    });

    const createItem = new CreateItemService();
    await createItem.execute({
      name: "Coca",
      price: 123,
      restaurant: restaurant._id,
      itemCategory: category._id,
    });

    const get = await Item.find({});

    expect(get).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Coca",
          price: 123,
          restaurant: restaurant._id,
          itemCategory: category._id,
        }),
      ])
    );

    restaurant = await Restaurant.findById(restaurant._id)
      .populate("items")
      .lean();

    expect(restaurant.items).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Coca" })])
    );
  });

  it("should not create an item", async () => {
    const createItem = new CreateItemService();
    const response = async () =>
      createItem.execute({
        name: "Coca",
        price: 123,
        restaurant: "615f3c597a05198a375a8e32",
        itemCategory: "615f3c597a05198a375a8e33",
      });

    await expect(response()).rejects.toThrow("");
  });
});
