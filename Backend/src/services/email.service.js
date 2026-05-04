import transporter from "../config/mail.js";
import dotenv from "dotenv";
dotenv.config();

// ─── COLOR TOKENS ────────────────────────────────────────────
const C = {
  bg: "#0B1929",
  card: "#111F33",
  border: "#1E3048",
  inner: "#0D1A2A",
  text: "#EAF0F6",
  muted: "#6B7A8D",
  accent: "#FF6B35",
  white: "#FFFFFF",
};

const SEVERITY = {
  P1: { bg: "#3B0D0D", color: "#F87171", border: "#7F1D1D", label: "P1 · Critical" },
  P2: { bg: "#3B2800", color: "#FBBF24", border: "#78350F", label: "P2 · Major" },
  P3: { bg: "#052E16", color: "#34D399", border: "#065F46", label: "P3 · Minor" },
};

// ─── BASE WRAPPER ─────────────────────────────────────────────
// Uses table-based layout for maximum email client compatibility
const wrap = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>MayDayOps</title>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:${C.card};border:1px solid ${C.border};border-bottom:none;border-radius:16px 16px 0 0;padding:20px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:38px;vertical-align:middle;">
                    <div style="width:38px;height:38px;background-color:${C.accent};border-radius:10px;text-align:center;line-height:38px;font-size:20px;">&#9889;</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <span style="font-size:18px;font-weight:700;color:${C.white};letter-spacing:-0.3px;">MayDayOps</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVIDER LINE -->
          <tr>
            <td style="background-color:${C.card};border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
              <div style="height:1px;background-color:${C.border};"></div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:${C.card};border:1px solid ${C.border};border-top:none;border-bottom:none;padding:28px 28px 8px 28px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:${C.inner};border:1px solid ${C.border};border-top:none;border-radius:0 0 16px 16px;padding:18px 28px;">
              <p style="margin:0;font-size:12px;color:${C.muted};line-height:1.6;text-align:center;">
                This email was sent by MayDayOps &bull; You are receiving this because someone invited you.<br/>
                If you did not expect this email, you can safely ignore it.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ─── BUTTON COMPONENT ─────────────────────────────────────────
const btn = (text, href) => `
  <table cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 8px 0;">
    <tr>
      <td style="background-color:${C.accent};border-radius:10px;">
        <a href="${href}" target="_blank"
          style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;color:${C.white};text-decoration:none;letter-spacing:0.2px;">
          ${text}
        </a>
      </td>
    </tr>
  </table>`;

// ─── SEND HELPER ──────────────────────────────────────────────
const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
};

// ─────────────────────────────────────────────────────────────
// 1. INVITE EMAIL
// ─────────────────────────────────────────────────────────────
export const sendInviteEmail = async ({
  to,
  inviteLink,
  companyName,
  invitedByName,
}) => {
  const content = `
    <!-- Tag -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
      <tr>
        <td style="background-color:#1E3048;border:1px solid ${C.border};border-radius:20px;padding:4px 14px;">
          <span style="font-size:11px;font-weight:700;color:${C.accent};letter-spacing:1.5px;text-transform:uppercase;">Team Invitation</span>
        </td>
      </tr>
    </table>

    <!-- Heading -->
    <h1 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:${C.white};line-height:1.3;">
      You've been invited!
    </h1>

    <!-- Body text -->
    <p style="margin:0 0 8px 0;font-size:15px;color:${C.muted};line-height:1.7;">
      <strong style="color:${C.text};">${invitedByName}</strong> has invited you to join
      <strong style="color:${C.white};">${companyName}</strong> on MayDayOps
      &mdash; the smart incident response platform.
    </p>

    <!-- Info box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background-color:${C.inner};border:1px solid ${C.border};border-left:3px solid ${C.accent};border-radius:0 10px 10px 0;padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:${C.muted};line-height:1.6;">
            &#128336; &nbsp;This invite expires in <strong style="color:${C.text};">48 hours</strong><br/>
            &#127970; &nbsp;You will join: <strong style="color:${C.text};">${companyName}</strong><br/>
            &#128274; &nbsp;Your role will be: <strong style="color:${C.text};">Member</strong>
          </p>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    ${btn("Accept Invitation &rarr;", inviteLink)}

    <!-- small note -->
    <p style="margin:16px 0 20px 0;font-size:12px;color:${C.muted};">
      Or copy this link into your browser:<br/>
      <span style="color:${C.accent};word-break:break-all;">${inviteLink}</span>
    </p>
  `;

  await sendMail({
    to,
    subject: `You're invited to join ${companyName} on MayDayOps`,
    html: wrap(content),
  });
};

// ─────────────────────────────────────────────────────────────
// 2. VERIFICATION EMAIL
// ─────────────────────────────────────────────────────────────
export const sendVerificationEmail = async ({
  to,
  verifyLink,
  userName,
}) => {
  const content = `
    <!-- Tag -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
      <tr>
        <td style="background-color:#1E3048;border:1px solid ${C.border};border-radius:20px;padding:4px 14px;">
          <span style="font-size:11px;font-weight:700;color:#60A5FA;letter-spacing:1.5px;text-transform:uppercase;">Email Verification</span>
        </td>
      </tr>
    </table>

    <!-- Heading -->
    <h1 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:${C.white};line-height:1.3;">
      Verify your email address
    </h1>

    <!-- Body -->
    <p style="margin:0 0 16px 0;font-size:15px;color:${C.muted};line-height:1.7;">
      Hi <strong style="color:${C.text};">${userName}</strong>, welcome to MayDayOps!
      Please verify your email address to activate your account and get started.
    </p>

    <!-- Info box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background-color:${C.inner};border:1px solid ${C.border};border-left:3px solid #60A5FA;border-radius:0 10px 10px 0;padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:${C.muted};line-height:1.6;">
            &#128336; &nbsp;This link expires in <strong style="color:${C.text};">24 hours</strong><br/>
            &#9989; &nbsp;One click to activate your account
          </p>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    ${btn("Verify Email Address &rarr;", verifyLink)}

    <p style="margin:16px 0 20px 0;font-size:12px;color:${C.muted};">
      If you did not create an MayDayOps account, you can safely ignore this email.
    </p>
  `;

  await sendMail({
    to,
    subject: "Verify your email — MayDayOps",
    html: wrap(content),
  });
};

// ─────────────────────────────────────────────────────────────
// 2b. PASSWORD RESET
// ─────────────────────────────────────────────────────────────
export const sendPasswordResetEmail = async ({ to, resetLink, userName }) => {
  const content = `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
      <tr>
        <td style="background-color:#1E3048;border:1px solid ${C.border};border-radius:20px;padding:4px 14px;">
          <span style="font-size:11px;font-weight:700;color:${C.accent};letter-spacing:1.5px;text-transform:uppercase;">Password reset</span>
        </td>
      </tr>
    </table>
    <h1 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:${C.white};line-height:1.3;">
      Reset your MayDayOps password
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;color:${C.muted};line-height:1.7;">
      Hi <strong style="color:${C.text};">${userName}</strong>, we received a request to reset your password.
      This link expires in <strong style="color:${C.text};">1 hour</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="background-color:${C.inner};border:1px solid ${C.border};border-left:3px solid ${C.accent};border-radius:0 10px 10px 0;padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:${C.muted};line-height:1.6;">
            If you didn't ask for this, you can ignore this email — your password will stay the same.
          </p>
        </td>
      </tr>
    </table>
    ${btn("Choose a new password &rarr;", resetLink)}
    <p style="margin:16px 0 20px 0;font-size:12px;color:${C.muted};">
      Or paste this URL:<br/><span style="color:${C.accent};word-break:break-all;">${resetLink}</span>
    </p>
  `;

  await sendMail({
    to,
    subject: "Reset your MayDayOps password",
    html: wrap(content),
  });
};

// ─────────────────────────────────────────────────────────────
// 3. ASSIGNMENT EMAIL
// ─────────────────────────────────────────────────────────────
export const sendAssignmentEmail = async ({
  to,
  userName,
  incidentTitle,
  severity,
  incidentLink,
}) => {
  const sev = SEVERITY[severity] || SEVERITY.P3;

  const content = `
    <!-- Severity badge -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
      <tr>
        <td style="background-color:${sev.bg};border:1px solid ${sev.border};border-radius:20px;padding:5px 14px;">
          <span style="font-size:12px;font-weight:700;color:${sev.color};letter-spacing:1px;">${sev.label}</span>
        </td>
      </tr>
    </table>

    <!-- Heading -->
    <h1 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:${C.white};line-height:1.3;">
      You've been assigned to an incident
    </h1>

    <!-- Body -->
    <p style="margin:0 0 16px 0;font-size:15px;color:${C.muted};line-height:1.7;">
      Hi <strong style="color:${C.text};">${userName}</strong>,
      you have been assigned to investigate and resolve the following incident:
    </p>

    <!-- Incident card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 8px 0;">
      <tr>
        <td style="background-color:${C.inner};border:1px solid ${C.border};border-top:3px solid ${sev.color};border-radius:0 0 12px 12px;padding:18px 20px;">
          <p style="margin:0 0 10px 0;font-size:17px;font-weight:700;color:${C.white};line-height:1.4;">${incidentTitle}</p>
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background-color:${sev.bg};border:1px solid ${sev.border};border-radius:20px;padding:4px 12px;">
                <span style="font-size:11px;font-weight:700;color:${sev.color};">${sev.label}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- What to do -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0;">
      <tr>
        <td style="background-color:${C.inner};border:1px solid ${C.border};border-left:3px solid ${C.accent};border-radius:0 10px 10px 0;padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:${C.muted};line-height:1.8;">
            <strong style="color:${C.text};display:block;margin-bottom:6px;">Your next steps:</strong>
            &#9312; &nbsp;Open the incident and review details<br/>
            &#9313; &nbsp;Post your first timeline update<br/>
            &#9314; &nbsp;Coordinate with your team in real-time
          </p>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    ${btn("View Incident &rarr;", incidentLink)}

    <p style="margin:16px 0 20px 0;font-size:12px;color:${C.muted};">
      Login to MayDayOps to post updates and collaborate with your team in real-time.
    </p>
  `;

  await sendMail({
    to,
    subject: `[${severity}] You've been assigned: ${incidentTitle}`,
    html: wrap(content),
  });
};

// ─────────────────────────────────────────────────────────────
// 4. CONTACT FORM → TEAM INBOX
// ─────────────────────────────────────────────────────────────
export const sendContactSubmissionEmail = async ({
  to,
  fromName,
  fromEmail,
  companyName,
  phone,
  intentLabel,
  subject,
  message,
}) => {
  const escaped = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeMailto = escaped(fromEmail).replace(/"/g, "");
  const phoneLine =
    phone && String(phone).trim()
      ? `<p style="margin:0 0 8px;color:${C.muted};font-size:13px;">Phone: <strong style="color:${C.text};">${escaped(
          phone
        )}</strong></p>`
      : "";

  const html = `
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /></head>
<body style="margin:0;background:${C.bg};font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="24" cellspacing="0" style="background:${C.bg};">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:${C.card};border:1px solid ${C.border};border-radius:14px;">
        <tr><td style="padding:24px 26px;">
          <p style="margin:0 0 6px;color:${C.accent};font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">New lead — company interest</p>
          <p style="margin:0 0 18px;color:${C.white};font-size:18px;font-weight:700;">Someone wants MayDayOps for their company</p>
          <p style="margin:0 0 8px;color:${C.text};font-size:14px;">
            <strong>Company:</strong> ${escaped(companyName)}<br/>
            <strong>Contact:</strong> ${escaped(fromName)}<br/>
            <a href="mailto:${safeMailto}" style="color:${C.accent};">${escaped(fromEmail)}</a>
          </p>
          ${phoneLine}
          <p style="margin:0 0 8px;color:${C.muted};font-size:13px;">Intent: <strong style="color:${C.text};">${escaped(
            intentLabel
          )}</strong></p>
          <p style="margin:0 0 16px;color:${C.muted};font-size:13px;">
            Subject: <strong style="color:${C.text};">${escaped(subject)}</strong>
          </p>
          <div style="background:${C.inner};border:1px solid ${C.border};border-radius:10px;padding:16px 18px;">
            <pre style="margin:0;font-size:13px;color:${C.text};white-space:pre-wrap;font-family:inherit;line-height:1.6;">${escaped(
              message
            )}</pre>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  await sendMail({
    to,
    subject: `[MayDayOps lead] ${companyName} — ${subject}`,
    html,
  });
};