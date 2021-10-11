import Session, { SessionDocument } from "@modules/sessions/schema";

type Request = string;

type Response = string;

type SessionType = Omit<SessionDocument, "table"> & {
  table: { _id: string; restaurant: string };
};

export default class GetSessionRestaurantService {
  async execute(sessionId: Request): Promise<Response> {
    const session = (await Session.findById(sessionId)
      .populate("table", "restaurant")
      .lean()) as unknown as SessionType;

    if (!session) {
      throw new Error("Session not found");
    }

    return String(session.table.restaurant);
  }
}
