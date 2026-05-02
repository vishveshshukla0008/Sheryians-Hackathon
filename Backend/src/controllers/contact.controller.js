import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import ContactInquiry from "../models/ContactInquiry.js";
import logger from "../utils/logger.js";
import { sendContactSubmissionEmail } from "../services/email.service.js";

const validationOrThrow = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }
};

const INTENT_LABEL = {
  purchase_company: "Company purchase / onboarding",
  demo: "Book a demo",
  pricing: "Pricing & plans",
  general: "General question",
};

export const submitContact = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { name, email, companyName, subject, message, phone, intent } = req.body;
    const trimmedSubject = subject?.trim() || "Sales inquiry";
    const intentKey = intent && INTENT_LABEL[intent] ? intent : "purchase_company";
    const intentLabel = INTENT_LABEL[intentKey];

    const inquiry = await ContactInquiry.create({
      contactName: name.trim(),
      email: email.toLowerCase().trim(),
      companyName: companyName.trim(),
      phone: (phone || "").trim(),
      intent: intentKey,
      subject: trimmedSubject,
      message: message.trim(),
    });

    const inbox = process.env.CONTACT_TEAM_EMAIL;
    if (inbox) {
      try {
        await sendContactSubmissionEmail({
          to: inbox,
          fromName: name.trim(),
          fromEmail: email.toLowerCase().trim(),
          companyName: companyName.trim(),
          phone: (phone || "").trim(),
          intentLabel,
          subject: trimmedSubject,
          message: message.trim(),
        });
        inquiry.teamNotifiedAt = new Date();
        inquiry.teamNotifyError = undefined;
        await inquiry.save();
      } catch (mailErr) {
        inquiry.teamNotifyError = mailErr.message || String(mailErr);
        await inquiry.save();
        logger.error("Contact inquiry email failed (saved to DB)", {
          inquiryId: inquiry._id.toString(),
          err: inquiry.teamNotifyError,
        });
      }
    } else {
      inquiry.teamNotifyError = "CONTACT_TEAM_EMAIL unset";
      await inquiry.save();
      logger.warn("CONTACT_TEAM_EMAIL unset; inquiry saved in database only", {
        inquiryId: inquiry._id.toString(),
      });
    }

    logger.info("Contact / sales inquiry", {
      inquiryId: inquiry._id.toString(),
      company: companyName.trim(),
      email: email.toLowerCase().trim(),
      intent: intentKey,
    });

    return res.status(201).json({
      success: true,
      message:
        "Thanks — we've received your request. Our team will reach out about using IncidentPro for your company.",
      data: { id: inquiry._id },
    });
  } catch (error) {
    return next(error);
  }
};
