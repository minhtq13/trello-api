import express from "express";

const router = express.Router();
import { BoardController } from "../../controllers/board.controller.js";
import { BoardValidation } from "../../validations/board.validation.js";

router
  .route("/")
  // .get((req, res) => {
  //   console.log("GET boards");
  // })
  .post(BoardValidation.createNew, BoardController.createNew);

export const boardRoutes = router;
