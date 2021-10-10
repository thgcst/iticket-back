import MongoMock from "@shared/tests/MongoMock";

import Restaurant from "../schema";
import CreateRestaurantService from "./CreateRestaurantService";

describe("Create restaurant service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Restaurant.deleteMany({});
  });

  it("should be able to create a restaurant", async () => {
    const createRestaurant = new CreateRestaurantService();
    await createRestaurant.execute({ name: "Bar do zé" });

    const get = await Restaurant.find({});

    expect(get).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Bar do zé",
          items: [],
          tables: [],
          managers: [],
        }),
      ])
    );
  });
});
