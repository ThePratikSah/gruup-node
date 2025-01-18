import { Router } from "express";
import { menuRouter } from "./menu";
import { restaurantRouter } from "./restaurants";
import { categoryRouter } from "./categories";

export const rootRouter = Router();

rootRouter.use("/menu", menuRouter);
rootRouter.use("/restaurant", restaurantRouter);
rootRouter.use("/category", categoryRouter);
