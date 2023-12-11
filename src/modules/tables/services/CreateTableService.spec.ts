import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Table from "../schema";
import CreateTableService from "./CreateTableService";

describe("Create table service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Table.deleteMany();
    await Restaurant.deleteMany();
  });

  it("should be able to create a table", async () => {
    let restaurant = await Restaurant.create({ name: "Bar do zé" });
    const createTable = new CreateTableService();
    const table = await createTable.execute({
      number: 1,
      restaurant: restaurant._id,
    });

    const tables = await Table.find({});

    expect(tables).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          number: 1,
          restaurant: restaurant._id,
        }),
      ])
    );

    restaurant = await Restaurant.findById(restaurant._id)
      .populate("tables")
      .lean();

    expect(restaurant.tables).toEqual(
      expect.arrayContaining([expect.objectContaining({ _id: table._id })])
    );
  });

  it("should not create table if restaurant doesn't exist", async () => {
    const createTable = new CreateTableService();
    const response = async () =>
      createTable.execute({
        number: 1,
        restaurant: "615f7444857695dfb05824cd",
      });

    await expect(response()).rejects.toThrow();
  });
});
