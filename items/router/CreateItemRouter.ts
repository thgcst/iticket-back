import { Request, Response } from "express";

import * as Yup from "yup";

import CreateItem from "../services/CreateItemService";

const createRestaurantRouter = async (req: Request, res: Response) => {
  const schema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    description: Yup.string(),
    price: Yup.number().required(),
    image: Yup.string(),
    restaurant: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: "Validation fails" });
  }

  const result = await CreateItem(req.body);

  return res.json(result);
};

export default createRestaurantRouter;
