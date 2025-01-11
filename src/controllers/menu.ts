import { Request, Response } from "express";
import { getRestaurantData } from "../helpers/query";

export async function menuController(req: Request, res: Response) {
  const { shortname } = req.params;

  try {
    const restaurant = await getRestaurantData(shortname);
    return res.json(restaurant);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error, message: "Failed to fetch data of restaurant" });
  }
}
