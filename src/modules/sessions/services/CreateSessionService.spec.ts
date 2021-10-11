import Table from "@modules/tables/schema";
import User from "@modules/users/schema";

import MongoMock from "@shared/tests/MongoMock";

import Session from "../schema";
import CreateSessionService from "./CreateSessionService";

describe("Create session service", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Session.deleteMany({});
  });

  it("should return error if table doesn't exist", async () => {
    const MockCreateUserService = { execute: jest.fn() };
    const MockGetUserFromPhoneService = { execute: jest.fn() };
    const MockGetTableService = { execute: jest.fn() };

    const createSession = new CreateSessionService(
      MockCreateUserService,
      MockGetUserFromPhoneService,
      MockGetTableService
    );
    const response = async () =>
      createSession.execute({
        name: "John Doe",
        phone: "21123121231",
        table: "615f7444857695dfb05824cd",
      });

    await expect(response()).rejects.toThrow();
  });
});

describe("Create session service (with created table)", () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Session.deleteMany({});
    await User.deleteMany({});
    await Table.deleteMany({});
  });

  it("should create user if it doesn't exist yet", async () => {
    const MockCreateUserService = {
      execute: jest.fn().mockReturnValue({
        name: "John Doe",
        phone: "21123121231",
        sessions: [],
        _id: "615f7444857695dfb05824cf",
      }),
    };
    const MockGetUserFromPhoneService = {
      execute: jest.fn(),
    };
    const MockGetTableService = {
      execute: jest.fn().mockReturnValue({
        number: 1,
        restaurant: "615f7444857695dfb05824cd",
        sessions: [],
        _id: "615f7444857695dfb05824ce",
      }),
    };

    const createSession = new CreateSessionService(
      MockCreateUserService,
      MockGetUserFromPhoneService,
      MockGetTableService
    );

    await createSession.execute({
      name: "John Doe",
      phone: "21123121231",
      table: "615f7444857695dfb05824ce",
    });

    expect(MockGetUserFromPhoneService.execute).toBeCalledWith({
      phone: "21123121231",
    });
    expect(MockCreateUserService.execute).toBeCalledWith({
      name: "John Doe",
      phone: "21123121231",
    });
  });

  it("should not create user if it already exists", async () => {
    const MockCreateUserService = {
      execute: jest.fn(),
    };
    const MockGetUserFromPhoneService = {
      execute: jest.fn().mockReturnValue({
        name: "John Doe",
        phone: "21123121231",
        sessions: [],
        _id: "615f7444857695dfb05824cf",
      }),
    };
    const MockGetTableService = {
      execute: jest.fn().mockReturnValue({
        number: 1,
        restaurant: "615f7444857695dfb05824cd",
        sessions: [],
        _id: "615f7444857695dfb05824ce",
      }),
    };

    const createSession = new CreateSessionService(
      MockCreateUserService,
      MockGetUserFromPhoneService,
      MockGetTableService
    );

    await createSession.execute({
      name: "John Doe",
      phone: "21123121231",
      table: "615f7444857695dfb05824ce",
    });

    expect(MockGetUserFromPhoneService.execute).toBeCalledWith({
      phone: "21123121231",
    });
    expect(MockCreateUserService.execute).not.toBeCalled();
  });

  it("should update table and user", async () => {
    let user = await User.create({ name: "John Doe", phone: "21123121231" });
    let table = await Table.create({
      number: 1,
      restaurant: "615f7444857695dfb05824cd",
    });
    const MockCreateUserService = {
      execute: jest.fn(),
    };
    const MockGetUserFromPhoneService = {
      execute: jest.fn().mockReturnValue(user),
    };
    const MockGetTableService = {
      execute: jest.fn().mockReturnValue(table),
    };

    const createSession = new CreateSessionService(
      MockCreateUserService,
      MockGetUserFromPhoneService,
      MockGetTableService
    );

    await createSession.execute({
      name: "John Doe",
      phone: "21123121231",
      table: "615f7444857695dfb05824ce",
    });

    table = await Table.findById(table._id);

    expect(table.sessions.length).toBe(1);

    user = await User.findById(user._id);

    expect(user.sessions.length).toBe(1);
  });

  it("should not recreate session if an active one already exists", async () => {
    const user = await User.create({ name: "John Doe", phone: "21123121231" });
    const MockCreateUserService = {
      execute: jest.fn(),
    };
    const MockGetUserFromPhoneService = {
      execute: jest.fn().mockReturnValue(user),
    };
    const MockGetTableService = {
      execute: jest.fn().mockReturnValue({
        number: 1,
        restaurant: "615f7444857695dfb05824cd",
        sessions: [],
        _id: "615f7444857695dfb05824ce",
      }),
    };

    const createSession = new CreateSessionService(
      MockCreateUserService,
      MockGetUserFromPhoneService,
      MockGetTableService
    );

    const createdSession = await createSession.execute({
      name: "John Doe",
      phone: "21123121231",
      table: "615f7444857695dfb05824ce",
    });

    const recreatedSession = await createSession.execute({
      name: "John Doe",
      phone: "21123121231",
      table: "615f7444857695dfb05824ce",
    });

    expect(recreatedSession.session.id).toBe(createdSession.session.id);
  });
});
