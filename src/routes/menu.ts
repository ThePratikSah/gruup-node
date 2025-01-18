import { Router } from "express";
import { menuController, createMenuItem } from "../controllers/menu";
import { validateData } from "../middleware/menu";
import { restaurantSchema } from "../validator/restaurant";

export const menuRouter = Router();

menuRouter.get("/:shortname", validateData(restaurantSchema), menuController);
menuRouter.post("/menu-item", createMenuItem);
