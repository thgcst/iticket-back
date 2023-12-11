import ItemCategory from "@modules/itemCategories/schema";
import Item from "@modules/items/schema";
import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import GetItemsOfRestaurantService from "./GetItemsOfRestaurantService";

describe("Get items of restaurant service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Item.deleteMany({});
    await Restaurant.deleteMany({});
  });

  it("should be able to get all items of a restaurant", async () => {
    const restaurant = await Restaurant.create({ name: "Suqueria" });
    const category = await ItemCategory.create({ name: "Suqueria", order: 1 });

    const item1 = await Item.create({
      name: "Coca",
      price: 6.5,
      restaurant: String(restaurant._id),
      itemCategory: String(category._id),
    });

    const item2 = await Item.create({
      name: "Guaraná",
      price: 7,
      restaurant: String(restaurant._id),
      itemCategory: String(category._id),
    });

    Restaurant.findByIdAndUpdate(
      restaurant._id,
      {
        $addToSet: { items: [item1._id, item2._id] },
      },
      { upsert: true }
    );

    const getItemsOfRestaurant = new GetItemsOfRestaurantService();

    const items = await getItemsOfRestaurant.execute({
      restaurantId: restaurant._id,
    });

    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Coca",
          price: 6.5,
        }),
        expect.objectContaining({
          name: "Guaraná",
          price: 7,
        }),
      ])
    );
  });
});
