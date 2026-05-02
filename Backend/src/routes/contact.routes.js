import express from "express";
import { body } from "express-validator";
import { submitContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("contact name is required"),
    body("companyName").trim().notEmpty().withMessage("company name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("message must be at least 10 characters"),
    body("subject").optional({ values: "falsy" }).trim().isLength({ max: 200 }),
    body("phone").optional({ values: "falsy" }).trim().isLength({ max: 40 }),
    body("intent")
      .optional()
      .isIn(["purchase_company", "demo", "pricing", "general"])
      .withMessage("invalid intent"),
  ],
  submitContact
);

export default router;
