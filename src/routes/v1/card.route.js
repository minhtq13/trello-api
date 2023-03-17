import express from "express";

const router = express.Router();
import { CardController } from "../../controllers/card.controller.js";
import { CardValidation } from "../../validations/card.validation.js";

router.route("/").post(CardValidation.createNew, CardController.createNew);

export const cardRoutes = router;
