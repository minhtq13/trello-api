import express from "express";
import { HttpStatusCode } from "../../utilities/constants.js";
import { boardRoutes } from "./board.route.js";
import { columnRoutes } from "./column.route.js";
import { cardRoutes } from "./card.route.js";

const router = express.Router();

// GET v1/status

router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({
    status: "OK!",
  })
);

// Board APIs
router.use("/boards", boardRoutes);

// Column APIs
router.use("/columns", columnRoutes);

// Card APIs
router.use("/cards", cardRoutes);

export const apiV1 = router;
