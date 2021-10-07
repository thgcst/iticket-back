import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Item from "../schema";
import CreateItem from "./CreateItemService";

describe("Create Item Service", () => {
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

  it("should be able to create an item", async () => {
    const restaurant = await Restaurant.create({ name: "bar do zé" });
    await CreateItem({
      name: "coca cola",
      price: 123,
      restaurant: restaurant._id,
    });

    const get = await Item.find({});

    expect(get).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "coca cola",
          price: 123,
        }),
      ])
    );
  });
});
