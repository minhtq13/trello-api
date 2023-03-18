import express from "express";

const router = express.Router();
import { BoardController } from "../../controllers/board.controller.js";
import { BoardValidation } from "../../validations/board.validation.js";

router.route("/").post(BoardValidation.createNew, BoardController.createNew);

router.route("/:id").get(BoardController.getFullBoard);

router
    .route("/:id")
    .get(BoardController.getFullBoard)
    .put(BoardValidation.update, BoardController.update);
export const boardRoutes = router;
