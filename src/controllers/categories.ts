import { Request, Response } from "express";
import { createCategory, getCategories } from "../helpers/query";
import { Prisma } from "@prisma/client";

export async function addNewCatrgory(req: Request, res: Response) {
  try {
    const { name } = req.body as Prisma.CategoryCreateInput;
    const category = await createCategory(name);

    res.json({ message: "New category created", category });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to create new category" });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await getCategories();
    res.json({ message: "Categories fetched", categories });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to fetch categories" });
  }
}
