import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, "Not authorized, no token");
    }


    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        throw new ApiError(401, "Invalid token");
      }
      if (err.name === "TokenExpiredError") {
        throw new ApiError(401, "Token expired");
      }
      throw err;
    }

    const user = await User.findById(decoded.userId)
      .select("-password")
      .populate("companyId", "name slug plan");

    if (!user || !user.isActive) {
      throw new ApiError(401, "User not found or deactivated");
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
