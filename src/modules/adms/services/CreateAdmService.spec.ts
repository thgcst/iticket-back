/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from "bcryptjs";

import MongoMock from "@shared/tests/MongoMock";

import Adm from "../schema";
import CreateAdmService from "./CreateAdmService";

describe("Create adm service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Adm.deleteMany();
  });

  it("should be able to create an adm", async () => {
    const createAdm = new CreateAdmService();
    await createAdm.execute({ email: "adm@adm.com", password: "123456" });

    const adms = await Adm.find({ email: "adm@adm.com" });

    expect(adms.length).toBe(1);
  });

  it("should encrypt adm's password", async () => {
    const createAdm = new CreateAdmService();
    const password = "123456";
    const createdAdm = await createAdm.execute({
      email: "adm@adm.com",
      password,
    });

    const adm = await Adm.findById(createdAdm._id);

    const passwordMatches = await bcrypt.compare(password, adm.password);

    expect(passwordMatches).toBeTruthy();
  });

  it("should not create adms with the same email", async () => {
    const createAdm = new CreateAdmService();
    await createAdm.execute({ email: "adm@adm.com", password: "123456" });
    const response = async () =>
      createAdm.execute({ email: "adm@adm.com", password: "123456" });

    await expect(response()).rejects.toThrow();
  });

  it("should create adms with same password but different emails", async () => {
    const createAdm = new CreateAdmService();
    await createAdm.execute({ email: "adm@adm.com", password: "21123121231" });

    await createAdm.execute({ email: "adm2@adm.com", password: "21123121231" });

    const Adms = await Adm.find({});

    expect(Adms.length).toBe(2);
  });

  it("should not return adm's encrypted password", async () => {
    const createAdm = new CreateAdmService();
    const createdAdm = await createAdm.execute({
      email: "adm@adm.com",
      password: "21123121231",
    });

    expect(createdAdm).not.toHaveProperty("password");
  });
});
