import express from "express";

const router = express.Router();
import { ColumnController } from "../../controllers/column.controller.js";
import { ColumnValidation } from "../../validations/column.validation.js";

router.route("/").post(ColumnValidation.createNew, ColumnController.createNew);

router.route("/:id").put(ColumnValidation.update, ColumnController.update);

export const columnRoutes = router;
