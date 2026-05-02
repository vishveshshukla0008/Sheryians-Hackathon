import { validationResult } from "express-validator";
import Timeline from "../models/Timeline.js";
import Incident from "../models/Incident.js";
import ApiError from "../utils/ApiError.js";
import { getIO } from "../socket/socket.js";

const handleValidation = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Validation failed", errors.array()));
  }
  return null;
};

export const getTimelineEvents = async (req, res, next) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.incidentId,
      companyId: req.user.companyId,
    });

    if (!incident) {
      return next(new ApiError(404, "Incident not found"));
    }

    const timeline = await Timeline.find({
      incidentId: req.params.incidentId,
      companyId: req.user.companyId,
    })
      .populate("postedBy", "name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: {
        timeline,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const addTimelineEvent = async (req, res, next) => {
  try {
    const validationError = handleValidation(req, next);
    if (validationError) {
      return validationError;
    }

    const incident = await Incident.findOne({
      _id: req.params.incidentId,
      companyId: req.user.companyId,
    });

    if (!incident) {
      return next(new ApiError(404, "Incident not found"));
    }

    const { message } = req.body;

    const timelineEvent = await Timeline.create({
      incidentId: incident._id,
      message,
      postedBy: req.user._id,
      companyId: req.user.companyId,
    });

    const populatedEvent = await Timeline.findById(timelineEvent._id).populate(
      "postedBy",
      "name email"
    );

    getIO().to(`incident-${incident._id}`).emit("timeline:new", populatedEvent);

    return res.status(201).json({
      success: true,
      data: {
        timeline: populatedEvent,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  getTimelineEvents,
  addTimelineEvent,
};
