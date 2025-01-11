import { Router } from "express";
import { menuController } from "../controllers/menu";
import { validateData } from "../middleware/menu";
import { restaurantSchema } from "../validator/restaurant";

export const menuRouter = Router();

menuRouter.get("/:shortname", validateData(restaurantSchema), menuController);
