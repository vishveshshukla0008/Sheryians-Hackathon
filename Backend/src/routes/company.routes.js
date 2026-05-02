import express from "express";
import { body } from "express-validator";
import {
  inviteMember,
  acceptInvite,
  getInviteSetup,
  getCompanyMembers,
  getMyCompany,
  getPendingInvites,
} from "../controllers/company.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/invite/setup", getInviteSetup);

router.post(
  "/invite/accept",
  [
    body("token").trim().notEmpty().withMessage("token is required"),
    body("name").trim().notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters"),
  ],
  acceptInvite
);

router.post(
  "/invite",
  protect,
  authorize("ADMIN", "CEO"),
  [
    body("email").isEmail().withMessage("valid email is required"),
    body("role")
      .optional()
      .isIn(["CEO", "DEVELOPER", "MEMBER"])
      .withMessage("role must be CEO, DEVELOPER, or MEMBER"),
  ],
  inviteMember
);

router.get("/members", protect, authorize("ADMIN", "CEO"), getCompanyMembers);
router.get("/me", protect, getMyCompany);
router.get("/invites/pending", protect, authorize("ADMIN", "CEO"), getPendingInvites);

export default router;
