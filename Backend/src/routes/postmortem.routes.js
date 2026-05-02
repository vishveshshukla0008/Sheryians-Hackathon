import express from "express";
import { createPostmortem, getPostmortem } from "../controllers/postmortem.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);
router.post("/:id/postmortem", authorize("ADMIN", "CEO"), createPostmortem);
router.get("/:id/postmortem", getPostmortem);

export default router;
