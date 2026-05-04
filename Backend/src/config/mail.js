import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// Dedicated SMTP env vars avoid Windows treating PORT and port as the same variable.
// Port 587 + STARTTLS is the most reliable default on cloud providers like Render.
const smtpPort = Number(process.env.BREVO_SMTP_PORT) || 587;
const smtpSecure =
  process.env.BREVO_SMTP_SECURE === "true" ||
  process.env.BREVO_SMTP_SECURE === "1" ||
  smtpPort === 465;
const smtpConnectionTimeout =
  Number(process.env.BREVO_SMTP_CONNECTION_TIMEOUT_MS) || 15000;
const smtpGreetingTimeout =
  Number(process.env.BREVO_SMTP_GREETING_TIMEOUT_MS) || 10000;
const smtpSocketTimeout =
  Number(process.env.BREVO_SMTP_SOCKET_TIMEOUT_MS) || 20000;

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
  port: smtpPort,
  secure: smtpSecure,
  connectionTimeout: smtpConnectionTimeout,
  greetingTimeout: smtpGreetingTimeout,
  socketTimeout: smtpSocketTimeout,
  requireTLS: !smtpSecure,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log(
      `✅ Brevo SMTP transporter verified successfully (${process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com"}:${smtpPort}, secure=${smtpSecure})`
    );
  } catch (err) {
    console.error("❌ Brevo SMTP transporter verification failed!");
    console.error("Error Message:", err.message);
    console.error(
      "Check BREVO_SMTP_HOST, BREVO_SMTP_PORT, BREVO_SMTP_USER and BREVO_SMTP_PASS in Render settings."
    );
  }
};

export default transporter;
