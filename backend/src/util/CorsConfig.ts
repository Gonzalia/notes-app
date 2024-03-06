import cors from "cors";
import { Application } from "express";

export const CorsConfig = (app: Application) => {
  const allowedOrigins = ["http://localhost:5173"];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };
  app.use(cors(options));
};
