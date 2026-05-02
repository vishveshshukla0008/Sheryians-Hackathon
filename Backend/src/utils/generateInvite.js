import crypto from "crypto";

const generateInviteToken = () => crypto.randomBytes(32).toString("hex");

export default generateInviteToken;
