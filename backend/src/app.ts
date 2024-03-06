import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import noteRoutes from "./routes/note.routes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import { CorsConfig } from "./util/CorsConfig";

const app = express();
CorsConfig(app);

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 502;

  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
