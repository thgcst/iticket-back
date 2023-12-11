import { getMockReq, getMockRes } from "@jest-mock/express";

import MongoMock from "@shared/tests/MongoMock";

import User from "../schema";
import CreateSessionService from "../services/CreateSessionService";
import CreateSessionController from "./CreateSessionController";

describe("Create session controller", () => {
  let createSessionController: CreateSessionController;
  let mockCreateSessionService: CreateSessionService;

  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany();

    const mockFn = { execute: jest.fn() };

    mockCreateSessionService = {
      execute: jest.fn().mockReturnValue({
        number: 1,
        restaurant: "615f7444857695dfb05824cd",
        sessions: [],
        _id: "615f7444857695dfb05824ce",
      }),
      createUserService: mockFn,
      getUserFromPhoneService: mockFn,
      getTableService: mockFn,
    };

    createSessionController = new CreateSessionController(
      mockCreateSessionService
    );
  });

  it("should clear body", async () => {
    const req = getMockReq({
      body: {
        name: "John Doe",
        phone: "(21) 12312-1234",
        table: "615f7444857695dfb05824cd",
      },
    });
    const { res } = getMockRes();

    await createSessionController.execute(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(mockCreateSessionService.execute).toHaveBeenCalledWith({
      name: "John Doe",
      phone: "21123121234",
      table: "615f7444857695dfb05824cd",
    });
  });
});
