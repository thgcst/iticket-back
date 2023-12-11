import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Table from "../schema";
import GetTableService from "./GetTableService";

describe("Get table service", () => {
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

  it("should get a table from it's id", async () => {
    const restaurant = await Restaurant.create({ name: "Bar do zé" });
    const createdTable = await Table.create({
      number: 1,
      restaurant: restaurant._id,
    });

    const getTable = new GetTableService();
    const table = await getTable.execute({ tableId: createdTable._id });

    expect(table.number).toBe(1);
    expect(table.restaurant).toMatchObject({
      _id: restaurant._id,
      name: "Bar do zé",
    });
  });

  it("should return error if table doesn't exist", async () => {
    const getTable = new GetTableService();
    const response = async () =>
      getTable.execute({
        tableId: "615f3c597a05198a375a8e32",
      });

    await expect(response()).rejects.toThrow();
  });
});
