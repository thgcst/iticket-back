import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import ItemCategory from "../schema";
import CreateItemCategoryService from "./CreateItemCategoryService";

describe("Create Item Service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await ItemCategory.deleteMany();
    await Restaurant.deleteMany();
  });

  it("should be able to create an item", async () => {
    let restaurant = await Restaurant.create({ name: "Suqueria" });

    const createItem = new CreateItemCategoryService();
    await createItem.execute({
      name: "Bebidas",
      order: 1,
      restaurant: restaurant._id,
    });

    const get = await ItemCategory.find({});

    expect(get).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Bebidas",
          order: 1,
          restaurant: restaurant._id,
        }),
      ])
    );

    restaurant = await Restaurant.findById(restaurant._id)
      .populate("itemCategories")
      .lean();

    expect(restaurant.itemCategories).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Bebidas" })])
    );
  });

  it("should not create an item", async () => {
    const createItem = new CreateItemCategoryService();
    const response = async () =>
      createItem.execute({
        name: "Coca",
        order: 1,
        restaurant: "615f3c597a05198a375a8e32",
      });

    await expect(response()).rejects.toThrow("");
  });
});
