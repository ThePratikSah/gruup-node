import { Request, Response } from "express";
import { addItemToRestaurant, createRestaurant } from "../helpers/query";
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

    return res.json({ message: "New restaurant created", restaurant });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Failed to create new restaurant" });
  }
}

export async function addMenuItemToRestaurant(req: Request, res: Response) {
  try {
    const payload = req.body as Prisma.RestaurantMenuItemUncheckedCreateInput;
    const result = await addItemToRestaurant(payload);

    return res.json({ message: "Menu item added to restaurant", result });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Failed to add menu item to restaurant" });
  }
}
