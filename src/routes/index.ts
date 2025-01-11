import { Router } from "express";
import { menuRouter } from "./menu";

export const rootRouter = Router();

rootRouter.use("/menu", menuRouter);
