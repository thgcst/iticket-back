import Restaurant from "@modules/restaurants/schema";

import MongoMock from "@shared/tests/MongoMock";

import Table from "../schema";
import GetTableFromPhoneService from "./GetTableService";

describe("Get table service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Table.deleteMany({});
  });

  it("should get a table from it's id", async () => {
    const restaurant = await Restaurant.create({ name: "Bar do zé" });
    const createdTable = await Table.create({
      number: 1,
      restaurant: restaurant._id,
    });

    const getTableFromPhone = new GetTableFromPhoneService();
    const user = await getTableFromPhone.execute({ tableId: createdTable._id });

    expect(user).toMatchObject({
      number: 1,
      restaurant: restaurant._id,
    });
  });
});
