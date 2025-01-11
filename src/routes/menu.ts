import { Router } from "express";
import { menuController } from "../controllers/menu";

export const menu = Router();

menu.get("/:shortname", menuController);
