import express from "express";
import pino from "pino-http";
import cors from "cors";
import { rootRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino());

app.use("/api/v1", rootRouter);

export default app;
