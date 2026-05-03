import Incident from "../models/Incident.js";
import Timeline from "../models/Timeline.js";
import ApiError from "../utils/ApiError.js";
import { generatePostmortemFromTimeline } from "../services/ai.service.js";

export const createPostmortem = async (req, res, next) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      companyId: req.user.companyId,
    });

    if (!incident) {
      return next(new ApiError(404, "Incident not found"));
    }

    const timeline = await Timeline.find({
      incidentId: incident._id,
      companyId: req.user.companyId,
    }).populate("postedBy", "name email")
      .sort({ createdAt: 1 });

    const prompt = `
You are a senior DevOps engineer writing a production incident postmortem.

INCIDENT DETAILS:
- Title: ${incident.title}
- Severity: ${incident.severity}
- Status: ${incident.status}
- Started: ${incident.createdAt}
- Resolved: ${incident.resolvedAt || "Still active"}
- Description: ${incident.description}

INCIDENT TIMELINE (chronological):
${timeline.map((e) => `[${e.createdAt}] ${e.postedBy.name}: ${e.message}`).join("\n")}

Generate a structured postmortem report with EXACTLY these 3 sections:

## Summary
Write 2-3 sentences explaining what happened, when, and the business impact.

## Root Cause
Explain the probable technical root cause based on the timeline. Be specific and technical.

## Action Items
List exactly 3 actionable items to prevent this incident from recurring. Format as:
1. [action item]
2. [action item]  
3. [action item]

Be concise, technical, and professional.
`;

    const aiResult = await generatePostmortemFromTimeline(prompt);

    incident.postmortem = {
      summary: aiResult.summary,
      rootCause: aiResult.rootCause,
      actionItems: aiResult.actionItems,
      generatedAt: new Date(),
      aiGenerated: true,
    };

    await incident.save();

    return res.status(200).json({
      success: true,
      data: {
        postmortem: incident.postmortem,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getPostmortem = async (req, res, next) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      companyId: req.user.companyId,
    }).select("title postmortem severity status createdAt resolvedAt");

    if (!incident) {
      return next(new ApiError(404, "Incident not found"));
    }

    if (!incident.postmortem || !incident.postmortem.generatedAt) {
      return next(new ApiError(404, "Postmortem not found for this incident"));
    }

    return res.status(200).json({
      success: true,
      data: {
        incidentId: incident._id,
        title: incident.title,
        severity: incident.severity,
        status: incident.status,
        postmortem: incident.postmortem,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  createPostmortem,
  getPostmortem,
};
