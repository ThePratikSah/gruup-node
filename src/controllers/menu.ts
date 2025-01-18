import { Request, Response } from "express";
import { createNewMenuItem, getRestaurantData } from "../helpers/query";
import { Prisma } from "@prisma/client";

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

export async function createMenuItem(req: Request, res: Response) {
  try {
    // TODO: validate data
    const menuItemPayload = req.body as Prisma.MenuItemUncheckedCreateInput;
    const menuItem = await createNewMenuItem(menuItemPayload);

    return res.json({ message: "Menu item created", menuItem });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Failed to create menu item" });
  }
}
