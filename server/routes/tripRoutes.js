const express = require("express");
const router = express.Router();
const {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  trashTrip,
  deleteTrip,
  getTrashedTrips,
} = require("../controllers/tripController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getTrips);
router.get("/trashed", getTrashedTrips);
router.get("/:id", getTripById);
router.post("/", createTrip);
router.put("/:id", updateTrip);
router.patch("/:id/trash", trashTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
