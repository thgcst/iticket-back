import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import GetUserFromPhoneService from "./GetUserFromPhoneService";

describe("Get user from phone service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("should be able to get an user from it's phone", async () => {
    await User.create({ name: "John Doe", phone: "21123121231" });

    const getUserFromPhone = new GetUserFromPhoneService();
    const user = await getUserFromPhone.execute({ phone: "21123121231" });

    expect(user).toMatchObject({ name: "John Doe", phone: "21123121231" });
  });
});
