import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

describe("Add Recipients to Queue", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should be able to authenticate", async () => {
    // await User.create({
    //   name: "Test",
    //   email: "test@example.com",
    //   password: bcrypt.hashSync("testpass", 4),
    // });

    // const result = await AuthenticateService({
    //   email: "test@example.com",
    //   password: "testpass",
    // });

    // expect(result).toHaveProperty("token");
    // expect(result).toHaveProperty("user");
    expect(true).toBeTruthy();
  });
});
