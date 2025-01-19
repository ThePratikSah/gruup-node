import { Router } from "express";
import {
  menuController,
  createMenuItem,
  createBulkMenuItem,
} from "../controllers/menu";
import { validateData } from "../middleware/dataValidator";
import { menuItemSchema, restaurantSchema } from "../validator/validator";
import { authenticate } from "../middleware/auth";

export const menuRouter = Router();

menuRouter.get(
  "/:shortname",
  validateData(restaurantSchema, "params"),
  menuController
);
menuRouter.post(
  "/menu-item",
  authenticate,
  validateData(menuItemSchema, "body"),
  createMenuItem
);
menuRouter.post("/bulk-menu-item", createBulkMenuItem);
