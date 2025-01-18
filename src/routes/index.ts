import { Router } from "express";
import { menuRouter } from "./menu";
import { restaurantRouter } from "./restaurants";

export const rootRouter = Router();

rootRouter.use("/menu", menuRouter);
rootRouter.use("/restaurant", restaurantRouter);
