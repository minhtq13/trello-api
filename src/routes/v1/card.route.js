import express from "express";

const router = express.Router();
import { CardController } from "../../controllers/card.controller.js";
import { CardValidation } from "../../validations/card.validation.js";

router.route("/").post(CardValidation.createNew, CardController.createNew);

router
    .route("/:id")

    .put(CardValidation.update, CardController.update);

export const cardRoutes = router;
