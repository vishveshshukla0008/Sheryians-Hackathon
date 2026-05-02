import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import Company from "../models/Company.js";
import Invite from "../models/Invite.js";
import generateInviteToken from "../utils/generateInvite.js";
import generateToken from "../utils/generateToken.js";
import logger from "../utils/logger.js";
import { sendInviteEmail } from "../services/email.service.js";

const validationOrThrow = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }
};

const frontendOrigin = () => String(process.env.FRONTEND_URL || "").replace(/\/$/, "");

export const inviteMember = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { email, role } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      companyId: req.user.companyId._id,
    });

    if (existingUser) {
      throw new ApiError(409, "This person is already a member of your company");
    }

    const pendingInvite = await Invite.findOne({
      email: email.toLowerCase(),
      companyId: req.user.companyId._id,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (pendingInvite) {
      throw new ApiError(409, "An invite has already been sent to this email");
    }

    const token = generateInviteToken();

    await Invite.create({
      email: email.toLowerCase(),
      companyId: req.user.companyId._id,
      invitedBy: req.user._id,
      role: role || "MEMBER",
      token,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    });

    const base = frontendOrigin() || "http://localhost:3000";
    const inviteLink = `${base}/?token=${encodeURIComponent(token)}`;

    sendInviteEmail({
      to: email,
      inviteLink,
      companyName: req.user.companyId.name,
      invitedByName: req.user.name,
    }).catch((err) => logger.error("Invite email send failed", err.message));

    return res.status(200).json({
      success: true,
      message: `Invitation sent to ${email}`,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

export const getInviteSetup = async (req, res, next) => {
  try {
    const token = typeof req.query.token === "string" ? req.query.token.trim() : "";
    if (!token) {
      throw new ApiError(400, "token query parameter is required");
    }

    const invite = await Invite.findOne({ token }).populate("companyId", "name slug");

    if (!invite) {
      throw new ApiError(400, "Invalid invite link");
    }

    if (invite.isUsed) {
      throw new ApiError(400, "This invite has already been used — sign in with your email instead");
    }

    if (invite.expiresAt.getTime() < Date.now()) {
      throw new ApiError(400, "This invite has expired. Ask your admin to send a new one");
    }

    return res.status(200).json({
      success: true,
      data: {
        email: invite.email,
        companyName: invite.companyId?.name || "Your team",
        role: invite.role || "MEMBER",
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const acceptInvite = async (req, res, next) => {
  try {
    validationOrThrow(req);

    const { token, name, email, password } = req.body;

    const invite = await Invite.findOne({ token }).populate("companyId");

    if (!invite) {
      throw new ApiError(400, "Invalid invite link");
    }

    if (invite.isUsed) {
      throw new ApiError(400, "This invite has already been used");
    }

    if (invite.expiresAt.getTime() < Date.now()) {
      throw new ApiError(400, "This invite has expired. Ask your admin to send a new one");
    }

    const displayName = String(name || "").trim();
    const submittedEmail = String(email || "").toLowerCase().trim();

    if (submittedEmail !== invite.email) {
      throw new ApiError(
        400,
        `Sign up with the same email this invite was sent to (${invite.email})`
      );
    }

    const alreadyRegistered = await User.findOne({ email: invite.email.toLowerCase() });
    if (alreadyRegistered) {
      throw new ApiError(409, "An account with this email already exists. Please login instead");
    }

    const user = await User.create({
      name: displayName,
      email: invite.email.toLowerCase(),
      password,
      role: invite.role || "MEMBER",
      companyId: invite.companyId._id,
      isEmailVerified: true,
    });

    await Company.findByIdAndUpdate(invite.companyId._id, {
      $push: { members: user._id },
    });

    invite.isUsed = true;
    await invite.save();

    const jwtToken = generateToken({
      userId: user._id,
      role: user.role,
      companyId: invite.companyId._id,
    });

    return res.status(201).json({
      success: true,
      message: `Welcome to ${invite.companyId.name}! Your account has been created.`,
      data: {
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: {
            id: invite.companyId._id,
            name: invite.companyId.name,
            slug: invite.companyId.slug,
          },
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getCompanyMembers = async (req, res, next) => {
  try {
    const users = await User.find({ companyId: req.user.companyId._id }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: {
        count: users.length,
        members: users,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getMyCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.user.companyId._id)
      .populate("members", "name email role isActive lastLogin")
      .populate("ownerId", "name email");

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      data: { company },
    });
  } catch (error) {
    return next(error);
  }
};

export const getPendingInvites = async (req, res, next) => {
  try {
    const invites = await Invite.find({
      companyId: req.user.companyId._id,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })
      .populate("invitedBy", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Pending invites fetched successfully",
      data: { invites },
    });
  } catch (error) {
    return next(error);
  }
};
