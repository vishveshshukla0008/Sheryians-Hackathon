import Company from "../models/Company.js";
import Incident from "../models/Incident.js";
import ApiError from "../utils/ApiError.js";

const severityOrder = { P1: 1, P2: 2, P3: 3 };

const groupBySeverity = (incidents) => {
  return incidents.reduce(
    (acc, incident) => {
      acc[incident.severity].push(incident);
      return acc;
    },
    { P1: [], P2: [], P3: [] }
  );
};

export const getPublicStatus = async (req, res, next) => {
  try {
    const incidents = await Incident.find({ status: { $ne: "RESOLVED" } })
      .select("title severity status createdAt updatedAt companyId")
      .lean();

    incidents.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return res.status(200).json({
      success: true,
      data: {
        incidents,
        groupedBySeverity: groupBySeverity(incidents),
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getCompanyPublicStatus = async (req, res, next) => {
  try {
    const { companySlug } = req.params;

    const company = await Company.findOne({ slug: companySlug }).select("_id name slug");

    if (!company) {
      return next(new ApiError(404, "Company not found"));
    }

    const incidents = await Incident.find({
      companyId: company._id,
      status: { $ne: "RESOLVED" },
    })
      .select("title severity status createdAt updatedAt")
      .lean();

    incidents.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return res.status(200).json({
      success: true,
      data: {
        company,
        incidents,
        groupedBySeverity: groupBySeverity(incidents),
      },
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  getPublicStatus,
  getCompanyPublicStatus,
};
