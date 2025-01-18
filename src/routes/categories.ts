import { Router } from "express";
import { addNewCatrgory, getAllCategories } from "../controllers/categories";
import { validateData } from "../middleware/dataValidator";
import { categorySchema } from "../validator/validator";

export const categoryRouter = Router();

categoryRouter.post("/", validateData(categorySchema, "body"), addNewCatrgory);
categoryRouter.get("/", getAllCategories);
