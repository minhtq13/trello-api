import express from "express";

import { env } from "./config/environment.js";

import { connectDB } from "./config/mongodb.js";

const app = express();

connectDB().catch(console.log);

app.get("/", (req, res) => {
  res.end("<h1>Hello world!</h1><hr/>");
});

app.listen(env.PORT, env.HOST, () => {
  console.log(`Hello, I'm running at ${env.HOST}:${env.PORT}`);
});
