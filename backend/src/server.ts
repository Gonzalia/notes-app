import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("DATABASE CONNECTED");
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("An error has occurred: ", error);
  });
