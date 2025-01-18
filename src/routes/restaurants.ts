import { Router } from "express";
import {
  addMenuItemToRestaurant,
  addNewRestaurant,
} from "../controllers/restaurants";
import { validateData } from "../middleware/dataValidator";
import { addNewRestaurantSchema } from "../validator/validator";

export const restaurantRouter = Router();

restaurantRouter.post(
  "/",
  validateData(addNewRestaurantSchema, "body"),
  addNewRestaurant
);
restaurantRouter.post("/add-menu-item-to-restaurant", addMenuItemToRestaurant);
