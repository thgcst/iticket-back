/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from "bcryptjs";

import Restaurant, { RestaurantDocument } from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Manager from "../schema";
import CreateManagerService from "./CreateManagerService";

describe("Create manager service", () => {
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

  it("should be able to create a manager", async () => {
    const createManager = new CreateManagerService();
    await createManager.execute({
      email: "manager@manager.com",
      password: "123456",
      restaurant: restaurant.id,
    });

    const manager = await Manager.findOne({ email: "manager@manager.com" });

    expect(manager).toBeTruthy();

    const managersRestaurant = await Restaurant.findById(restaurant.id)
      .populate("managers")
      .lean();

    expect(managersRestaurant.managers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: "manager@manager.com",
        }),
      ])
    );
  });

  it("should encrypt manager's password", async () => {
    const createManager = new CreateManagerService();
    const password = "123456";
    const createdManager = await createManager.execute({
      email: "manager@manager.com",
      password,
      restaurant: restaurant.id,
    });

    const manager = await Manager.findById(createdManager._id);

    const passwordMatches = await bcrypt.compare(password, manager.password);

    expect(passwordMatches).toBeTruthy();
  });

  it("should not create managers with the same email", async () => {
    const createManager = new CreateManagerService();
    await createManager.execute({
      email: "manager@manager.com",
      password: "123456",
      restaurant: restaurant.id,
    });
    const response = async () =>
      createManager.execute({
        email: "manager@manager.com",
        password: "123456",
        restaurant: restaurant.id,
      });

    await expect(response()).rejects.toThrow();
  });

  it("should create managers with same password but different emails", async () => {
    const createManager = new CreateManagerService();
    await createManager.execute({
      email: "manager@manager.com",
      password: "21123121231",
      restaurant: restaurant.id,
    });

    await createManager.execute({
      email: "manager2@manager.com",
      password: "21123121231",
      restaurant: restaurant.id,
    });

    const Managers = await Manager.find({});

    expect(Managers.length).toBe(2);
  });

  it("should not return manager's encrypted password", async () => {
    const createManager = new CreateManagerService();
    const createdManager = await createManager.execute({
      email: "manager@manager.com",
      password: "21123121231",
      restaurant: restaurant.id,
    });

    expect(createdManager).not.toHaveProperty("password");
  });
});
