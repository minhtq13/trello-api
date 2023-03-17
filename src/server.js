import express from "express";
import { env } from "./config/environment.js";
import { connectDB } from "./config/mongodb.js";
import { apiV1 } from "./routes/v1/index.js";
connectDB()
  .then(() => console.log("Connected successfully to database server!"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  // Enable req.body data === body-parser
  app.use(express.json());

  // Use APIS v1
  app.use("/v1", apiV1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello, I'm running at ${env.APP_HOST}:${env.APP_PORT}`);
  });
};
