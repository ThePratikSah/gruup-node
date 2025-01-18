import { Router } from "express";
import { addNewRestaurant } from "../controllers/restaurants";

export const restaurantRouter = Router();

restaurantRouter.post("/", addNewRestaurant);
