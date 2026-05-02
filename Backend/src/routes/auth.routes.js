import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  getMe,
  logout,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters"),
    body("companyName").trim().notEmpty().withMessage("companyName is required"),
    body("role")
      .optional()
      .isIn(["ADMIN", "CEO"])
      .withMessage("role must be ADMIN or CEO for company owner"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("valid email is required"),
    body("password").notEmpty().withMessage("password is required"),
  ],
  login
);

router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
router.get("/verify-email", verifyEmail);
router.post(
  "/resend-verification",
  [body("email").isEmail().withMessage("valid email is required")],
  resendVerification
);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("valid email is required")],
  forgotPassword
);

router.post(
  "/reset-password",
  [
    body("token").trim().notEmpty().withMessage("reset token is required"),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters"),
    body("confirmPassword").isLength({ min: 8 }).withMessage("confirm password must be at least 8 characters"),
  ],
  resetPassword
);

export default router;
