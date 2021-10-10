import Manager from "@modules/managers/schema";

type Request = string;

type Response = string;

export default class GetManagerRestaurantService {
  async execute(managerId: Request): Promise<Response> {
    const manager = await Manager.findById(managerId).lean();

    if (!manager) {
      throw new Error("Manager not found");
    }

    return String(manager.restaurant);
  }
}
