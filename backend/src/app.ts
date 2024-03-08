import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import noteRoutes from "./routes/note.routes";
import userRoutes from "./routes/user.routes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import { CorsConfig } from "./util/CorsConfig";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();
CorsConfig(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      path: "/",
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

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
