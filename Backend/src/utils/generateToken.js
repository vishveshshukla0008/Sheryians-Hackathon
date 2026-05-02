import jwt from "jsonwebtoken";

const generateToken = ({ userId, role, companyId }) => {
  return jwt.sign({ userId, role, companyId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export default generateToken;
