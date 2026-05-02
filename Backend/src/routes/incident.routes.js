import express from "express";
import { body, query } from "express-validator";
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  assignIncidentUsers,
} from "../controllers/incident.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorize("ADMIN", "CEO"),
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("severity").isIn(["P1", "P2", "P3"]).withMessage("Severity must be P1, P2, or P3"),
  ],
  createIncident
);

router.get(
  "/",
  [
    query("status").optional().isIn(["OPEN", "INVESTIGATING", "RESOLVED"]),
    query("severity").optional().isIn(["P1", "P2", "P3"]),
  ],
  getIncidents
);

router.get("/:id", getIncidentById);

router.patch(
  "/:id/status",
  authorize("ADMIN", "CEO"),
  [body("status").isIn(["OPEN", "INVESTIGATING", "RESOLVED"])],
  updateIncidentStatus
);

router.post(
  "/:id/assign",
  authorize("ADMIN", "CEO"),
  [body("userIds").isArray({ min: 1 }).withMessage("userIds must be a non-empty array")],
  assignIncidentUsers
);

export default router;
