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
  });

  it("should be able to get all items of a restaurant", async () => {
    const restaurant = await Restaurant.create({ name: "Suqueria" });

    const item1 = await Item.create({
      name: "Coca",
      price: 6.5,
      restaurant: restaurant._id,
    });

    const item2 = await Item.create({
      name: "Guaraná",
      price: 7,
      restaurant: restaurant._id,
    });

    restaurant.items.push(item1._id, item2._id);
    await restaurant.save();

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
