import express from "express";
import { HttpStatusCode } from "../../utilities/constants.js";
import { boardRoutes } from "./board.route.js";

const router = express.Router();

// GET v1/status

router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({
    status: "OK!",
  })
);

// Board APIs

router.use("/boards", boardRoutes);

export const apiV1 = router;
