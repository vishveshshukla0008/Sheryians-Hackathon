import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// Dedicated SMTP env vars avoid Windows treating PORT and port as the same variable.
const smtpPort = Number(process.env.BREVO_SMTP_PORT);
const smtpSecure =
  process.env.BREVO_SMTP_SECURE === "true" ||
  process.env.BREVO_SMTP_SECURE === "1";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("Brevo SMTP transporter verified successfully");
  } catch (err) {
    console.error("Brevo SMTP transporter verification failed:", err.message);
  }
};

export default transporter;
