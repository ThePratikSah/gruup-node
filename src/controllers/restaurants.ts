import { Request, Response } from "express";
import { createRestaurant } from "../helpers/query";
import { Prisma } from "@prisma/client";

export async function addNewRestaurant(req: Request, res: Response) {
  try {
    const {
      logo = "",
      name,
      phone,
      address,
      shortname,
    } = req.body as Prisma.RestaurantCreateInput;

    const restaurant = await createRestaurant({
      logo,
      name,
      phone,
      address,
      shortname,
    });

    res.json({ message: "New restaurant created", restaurant });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to create new restaurant" });
  }
}
