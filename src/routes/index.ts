import { Router } from "express";
import { menuRouter } from "./menu";
import { restaurantRouter } from "./restaurants";
import { categoryRouter } from "./categories";
import { authenticate } from "../middleware/auth";
import { authRouter } from "./auth";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/menu", menuRouter);
rootRouter.use("/restaurant", authenticate, restaurantRouter);
rootRouter.use("/category", authenticate, categoryRouter);
