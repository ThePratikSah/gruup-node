import { Router } from "express";
import { addNewCatrgory, getAllCategories } from "../controllers/categories";

export const categoryRouter = Router();

categoryRouter.post("/", addNewCatrgory);
categoryRouter.get("/", getAllCategories);
