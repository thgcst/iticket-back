import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import CreateUserService from "./CreateUserService";

describe("Create user service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should be able to create an user", async () => {
    const createUser = new CreateUserService();
    await createUser.execute({ name: "John Doe", phone: "21123121231" });

    const users = await User.find({});

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John Doe",
          phone: "21123121231",
          sessions: [],
        }),
      ])
    );
  });

  it("should not create users with the same phone", async () => {
    const createUser = new CreateUserService();
    await createUser.execute({ name: "John Doe", phone: "21123121231" });
    const response = async () =>
      createUser.execute({ name: "John Doe2", phone: "21123121231" });

    await expect(response()).rejects.toThrow();
  });
});
