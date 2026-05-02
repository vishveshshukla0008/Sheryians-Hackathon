import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    plan: { type: String, enum: ["FREE", "PRO"], default: "FREE" },
  },
  { timestamps: true }
);

companySchema.pre("save", function generateSlug(next) {
  if (!this.isModified("name")) {
    return next();
  }

  const base = this.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  this.slug = `${base}-${Date.now().toString(36)}`;
  return next();
});

const Company = mongoose.model("Company", companySchema);
export default Company;
