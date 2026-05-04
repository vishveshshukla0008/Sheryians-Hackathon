import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import Company from "../models/Company.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import logger from "../utils/logger.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/email.service.js";

const validationOrThrow = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }
};

const getRequestBaseUrl = (req) => {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || req.protocol;
  return `${proto}://${req.get("host")}`;
};

export const register = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { name, email, password, companyName, role } = req.body;

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      throw new ApiError(409, "Email already registered");
    }

    const company = await Company.create({
      name: companyName,
      ownerId: new (await import("mongoose")).default.Types.ObjectId(),
      members: [],
      plan: "FREE",
    });

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "ADMIN",
      companyId: company._id,
    });

    company.ownerId = user._id;
    company.members.push(user._id);
    await company.save();

    const populatedUser = await User.findById(user._id).select("-password").populate(
      "companyId",
      "name slug plan"
    );

    const emailToken = crypto.randomBytes(32).toString("hex");
    const emailTokenHash = crypto.createHash("sha256").update(emailToken).digest("hex");

    user.isEmailVerified = false;
    user.emailVerificationTokenHash = emailTokenHash;
    user.emailVerificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const verifyLink = `${process.env.FRONTEND_URL}/verify-account?token=${emailToken}`;
    sendVerificationEmail({
      to: user.email,
      verifyLink,
      userName: user.name,
    }).catch((err) => logger.error("Verification email send failed", err.message));

    return res.status(201).json({
      success: true,
      message: "Account created. Please verify your email to continue.",
      data: {
        user: {
          id: populatedUser._id,
          name: populatedUser.name,
          email: populatedUser.email,
          role: populatedUser.role,
          isEmailVerified: false,
          companyId: {
            id: populatedUser.companyId._id,
            name: populatedUser.companyId.name,
            slug: populatedUser.companyId.slug,
          },
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+password")
      .populate("companyId", "name slug plan");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been deactivated");
    }

    if (!user.isEmailVerified) {
      throw new ApiError(403, "Please verify your email before logging in");
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      throw new ApiError(401, "Invalid email or password");
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({
      userId: user._id,
      role: user.role,
      companyId: user.companyId._id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(200).json({
      success: true,
      message: "Login Success !",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: {
            id: user.companyId._id,
            name: user.companyId.name,
            slug: user.companyId.slug,
          },
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("companyId", "name slug plan members");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const memberCount = Array.isArray(user.companyId?.members) ? user.companyId.members.length : 0;

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin,
          company: {
            id: user.companyId._id,
            name: user.companyId.name,
            slug: user.companyId.slug,
            plan: user.companyId.plan,
            memberCount,
          },
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      throw new ApiError(400, "Verification token is required");
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpiresAt: { $gt: new Date() },
    }).select("+emailVerificationTokenHash +emailVerificationExpiresAt");

    if (!user) {
      throw new ApiError(400, "Invalid or expired verification link");
    }

    user.isEmailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpiresAt = undefined;
    await user.save();

    const jwtToken = generateToken({
      userId: user._id,
      role: user.role,
      companyId: user.companyId,
    });

    const isProd = process.env.NODE_ENV === "production";
    const cookieMaxAgeMs = 7 * 24 * 60 * 60 * 1000;
    res.cookie("accessToken", jwtToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: cookieMaxAgeMs,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+emailVerificationTokenHash +emailVerificationExpiresAt"
    );

    if (!user) {
      throw new ApiError(200, "If this email exists, a verification link has been sent");
    }

    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: "Email is already verified",
        data: {},
      });
    }

    const emailToken = crypto.randomBytes(32).toString("hex");
    const emailTokenHash = crypto.createHash("sha256").update(emailToken).digest("hex");

    user.emailVerificationTokenHash = emailTokenHash;
    user.emailVerificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const verifyLink = `${getRequestBaseUrl(req)}/api/auth/verify-email?token=${emailToken}`;
    sendVerificationEmail({
      to: user.email,
      verifyLink,
      userName: user.name,
    }).catch((err) => logger.error("Verification resend failed", err.message));

    return res.status(200).json({
      success: true,
      message: "Verification email sent",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

const RESET_MSG =
  "If an account exists for that email with an active workspace, we've sent reset instructions";

export const forgotPassword = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { email } = req.body;
    const normalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalized }).select(
      "+passwordResetTokenHash +passwordResetExpiresAt"
    );

    if (user?.isActive) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

      user.passwordResetTokenHash = tokenHash;
      user.passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
      sendPasswordResetEmail({
        to: user.email,
        resetLink,
        userName: user.name,
      }).catch((err) => logger.error("Password reset email failed", err.message));
    }

    return res.status(200).json({
      success: true,
      message: RESET_MSG,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { token, password, confirmPassword } = req.body;

    if (String(password) !== String(confirmPassword)) {
      throw new ApiError(400, "Password fields must match");
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpiresAt +password");

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset link. Request a new one from Forgot password.");
    }

    user.password = password;
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated. You can sign in with your email and new password.",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};
