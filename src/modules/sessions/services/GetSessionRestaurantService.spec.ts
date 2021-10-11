import Restaurant, { RestaurantDocument } from "@modules/restaurants/schema";
import Table from "@modules/tables/schema";
import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

import Session, { SessionDocument } from "../schema";
import GetSessionRestaurantService from "./GetSessionRestaurantService";

describe("Get sessions's restaurant service", () => {
  let restaurant: RestaurantDocument;
  let session: SessionDocument;
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Session.deleteMany({});
    await Restaurant.deleteMany({});
    await Table.deleteMany({});
    await User.deleteMany({});

    restaurant = await Restaurant.create({ name: "Bar do zé" });
    const { id: table } = await Table.create({
      number: 1,
      restaurant: restaurant.id,
    });
    const { id: user } = await User.create({
      name: "John Doe",
      phone: "2112341234",
    });
    session = await Session.create({ user, table });
  });

  it("should get session's restaurant", async () => {
    const getSessionRestaurantService = new GetSessionRestaurantService();
    const response = await getSessionRestaurantService.execute(session.id);

    expect(response).toBe(restaurant.id);
  });

  it("should not find session", async () => {
    const getSessionRestaurantService = new GetSessionRestaurantService();
    const response = async () =>
      getSessionRestaurantService.execute("616275bcffcc33a3a424cd74");

    await expect(response()).rejects.toThrow("Session not found");
  });
});
