import express from "express";

const router = express.Router();
import { BoardController } from "../../controllers/board.controller.js";
import { BoardValidation } from "../../validations/board.validation.js";

router.route("/").post(BoardValidation.createNew, BoardController.createNew);

router.route("/:id").get(BoardController.getFullBoard);

export const boardRoutes = router;
