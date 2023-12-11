import bcrypt from "bcryptjs";

import Restaurant, { RestaurantDocument } from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Manager from "../schema";
import GetManagerRestaurantService from "./GetManagerRestaurantService";

describe("Get manager's restaurant service", () => {
  let restaurant: RestaurantDocument;
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Manager.deleteMany();
    await Restaurant.deleteMany();

    restaurant = await Restaurant.create({ name: "Bar do zé" });
  });

  it("should get manager's restaurant", async () => {
    const manager = await Manager.create({
      email: "manager@manager.com",
      password: bcrypt.hashSync("123456"),
      restaurant: restaurant.id,
    });

    const getManagerRestaurantService = new GetManagerRestaurantService();
    const response = await getManagerRestaurantService.execute(manager.id);

    expect(response).toBe(restaurant.id);
  });

  it("should not find manager", async () => {
    const getManagerRestaurantService = new GetManagerRestaurantService();
    const response = async () =>
      getManagerRestaurantService.execute("616275bcffcc33a3a424cd74");

    await expect(response()).rejects.toThrow("Manager not found");
  });
});
