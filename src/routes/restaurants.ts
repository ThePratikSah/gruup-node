import { Router } from "express";
import {
  addMenuItemToRestaurant,
  addNewRestaurant,
} from "../controllers/restaurants";

export const restaurantRouter = Router();

restaurantRouter.post("/", addNewRestaurant);
restaurantRouter.post("/add-menu-item-to-restaurant", addMenuItemToRestaurant);
