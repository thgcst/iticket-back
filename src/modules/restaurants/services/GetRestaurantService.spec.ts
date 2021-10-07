import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import GetRestaurantService from "./GetRestaurantService";

describe("Get restaurant service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Restaurant.deleteMany({});
  });

  it("should be able to get a restaurant", async () => {
    const createdRestaurant = await Restaurant.create({ name: "Bar do zé" });

    const getRestaurantService = new GetRestaurantService();

    const restaurant = await getRestaurantService.execute({
      restaurantId: createdRestaurant._id,
    });

    expect(restaurant).toEqual(
      expect.objectContaining({
        name: "Bar do zé",
        items: [],
        tables: [],
        managers: [],
      })
    );
  });

  // it("should not find restaurant and throw error", async () => {
  //   const getRestaurantService = new GetRestaurantService();

  //   const restaurant = async () =>
  //     getRestaurantService.execute({
  //       restaurantId: "asdfasdfasdfasdf",
  //     });

  //   await expect(restaurant()).rejects.toThrow("Restaurant not found");
  // });
});
