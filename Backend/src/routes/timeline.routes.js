import express from "express";
import { body } from "express-validator";
import { getTimelineEvents, addTimelineEvent } from "../controllers/timeline.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/:incidentId", getTimelineEvents);
router.post(
  "/:incidentId",
  [body("message").trim().notEmpty().withMessage("Message is required")],
  addTimelineEvent
);

export default router;
