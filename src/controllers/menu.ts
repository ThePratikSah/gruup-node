import { Request, Response } from "express";
import { getRestaurantData } from "../helpers/query";

export async function menuController(req: Request, res: Response) {
  const { shortname } = req.params;

  if (!shortname) {
    return res.status(400).json({ error: "Shortname is required" });
  }

  const restaurant = await getRestaurantData(shortname);
  return res.json({ restaurant });
}
