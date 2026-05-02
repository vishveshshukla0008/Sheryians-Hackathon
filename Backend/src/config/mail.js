import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
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
