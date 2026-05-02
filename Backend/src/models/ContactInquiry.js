import mongoose from "mongoose";

/** Public “Contact us” / sales leads — purchase or demo interest for a company */
const contactInquirySchema = new mongoose.Schema(
  {
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    intent: {
      type: String,
      enum: ["purchase_company", "demo", "pricing", "general"],
      default: "purchase_company",
    },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    teamNotifiedAt: { type: Date },
    teamNotifyError: { type: String, trim: true },
  },
  { timestamps: true }
);

const ContactInquiry = mongoose.model("ContactInquiry", contactInquirySchema);
export default ContactInquiry;
