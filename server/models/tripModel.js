const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  time: { type: String },
  description: { type: String, required: true },
});

const itineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  date: { type: String },
  activities: [activitySchema],
});

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed"],
      default: "planning",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    itinerary: [itineraryDaySchema],
    checklist: [
      {
        item: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
