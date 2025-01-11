import express from "express";
import pino from "pino-http";
import { menu } from "./routes/menu";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino());

app.use(menu);

export default app;
