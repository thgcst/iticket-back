import bcrypt from "bcryptjs";

import MongoMock from "@shared/tests/MongoMock";

import Adm from "../schema";
import SignInAdmService from "./SignInAdmService";

describe("Sign in adm service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Adm.deleteMany();
  });

  it("should sign adm in", async () => {
    await Adm.create({
      email: "adm@adm.com",
      password: bcrypt.hashSync("123456"),
    });

    const signInAdm = new SignInAdmService();
    const response = await signInAdm.execute({
      email: "adm@adm.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("email");
    expect(response).not.toHaveProperty(["password"]);
  });

  it("should not sign adm in", async () => {
    await Adm.create({ email: "adm@adm.com", password: "123456" });

    const signInAdm = new SignInAdmService();
    const response = async () =>
      signInAdm.execute({
        email: "adm@adm.com",
        password: "12345",
      });

    await expect(response()).rejects.toThrow("Invalid email/password");
  });
});
