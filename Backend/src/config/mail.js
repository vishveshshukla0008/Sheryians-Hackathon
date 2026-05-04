import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// Dedicated SMTP env vars avoid Windows treating PORT and port as the same variable.
const smtpPort = Number(process.env.BREVO_SMTP_PORT) || 465;
const smtpSecure =
  process.env.BREVO_SMTP_SECURE === "true" ||
  process.env.BREVO_SMTP_SECURE === "1" ||
  smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
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
    console.log("✅ Brevo SMTP transporter verified successfully");
  } catch (err) {
    console.error("❌ Brevo SMTP transporter verification failed!");
    console.error("Error Message:", err.message);
    console.error("Check your BREVO_SMTP_USER and BREVO_SMTP_PASS in Render settings.");
  }
};

export default transporter;
