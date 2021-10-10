import bcrypt from "bcryptjs";

import Restaurant, { RestaurantDocument } from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Manager from "../schema";
import SignInManagerService from "./SignInManagerService";

describe("Sign in manager service", () => {
  let restaurant: RestaurantDocument;
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Manager.deleteMany({});
    await Restaurant.deleteMany({});

    restaurant = await Restaurant.create({ name: "Bar do zé" });
  });

  it("should sign manager in", async () => {
    await Manager.create({
      email: "manager@manager.com",
      password: bcrypt.hashSync("123456"),
      restaurant: restaurant.id,
    });

    const signInManager = new SignInManagerService();
    const response = await signInManager.execute({
      email: "manager@manager.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("email");
    expect(response).not.toHaveProperty(["password"]);
  });

  it("should not sign manager in", async () => {
    await Manager.create({
      email: "manager@manager.com",
      password: "123456",
      restaurant: restaurant.id,
    });

    const signInManager = new SignInManagerService();
    const response = async () =>
      signInManager.execute({
        email: "manager@manager.com",
        password: "12345",
      });

    await expect(response()).rejects.toThrow("Invalid email/password");
  });
});
