import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || "smtp").toLowerCase();

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

const sendWithBrevoApi = async ({ to, subject, html }) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing for EMAIL_PROVIDER=brevo_api");
  }
  if (!process.env.MAIL_FROM) {
    throw new Error("MAIL_FROM is required for Brevo API emails");
  }

  const recipients = Array.isArray(to) ? to : [to];
  const payload = {
    sender: { email: process.env.MAIL_FROM },
    to: recipients.map((email) => ({ email })),
    subject,
    htmlContent: html,
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Brevo API send failed (${response.status}): ${text}`);
  }
};

export const sendMail = async ({ to, subject, html }) => {
  if (EMAIL_PROVIDER === "brevo_api") {
    return sendWithBrevoApi({ to, subject, html });
  }
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
};

export const verifyTransporter = async () => {
  if (EMAIL_PROVIDER === "brevo_api") {
    if (!process.env.BREVO_API_KEY) {
      console.error("❌ Brevo API key missing (BREVO_API_KEY).");
      return;
    }
    if (!process.env.MAIL_FROM) {
      console.error("❌ MAIL_FROM is missing for Brevo API mode.");
      return;
    }
    console.log("✅ Brevo API mail mode enabled");
    return;
  }

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
