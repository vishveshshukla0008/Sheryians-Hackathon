import express from "express";
import { getPublicStatus, getCompanyPublicStatus } from "../controllers/status.controller.js";

const router = express.Router();

router.get("/public", getPublicStatus);
router.get("/public/:companySlug", getCompanyPublicStatus);

export default router;
