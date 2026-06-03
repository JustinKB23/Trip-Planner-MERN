const Trip = require("../models/tripModel");

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
      isTrashed: false,
    }).populate("createdBy members", "name email");
    res.json({ status: true, trips });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("createdBy members", "name email");
    if (!trip) return res.status(404).json({ status: false, message: "Trip not found" });
    res.json({ status: true, trip });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const createTrip = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, members } = req.body;
    const trip = await Trip.create({
      title,
      destination,
      startDate,
      endDate,
      createdBy: req.user._id,
      members: members || [],
    });
    res.status(201).json({ status: true, trip });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ status: false, message: "Trip not found" });

    const { title, destination, startDate, endDate, status, members } = req.body;
    if (title) trip.title = title;
    if (destination) trip.destination = destination;
    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;
    if (status) trip.status = status;
    if (members) trip.members = members;

    const updated = await trip.save();
    res.json({ status: true, trip: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const trashTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ status: false, message: "Trip not found" });
    trip.isTrashed = true;
    await trip.save();
    res.json({ status: true, message: "Trip moved to trash" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ status: false, message: "Trip not found" });
    await trip.deleteOne();
    res.json({ status: true, message: "Trip deleted permanently" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getTrashedTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
      isTrashed: true,
    }).populate("createdBy members", "name email");
    res.json({ status: true, trips });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, trashTrip, deleteTrip, getTrashedTrips };
