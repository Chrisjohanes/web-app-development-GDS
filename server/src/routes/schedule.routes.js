const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/schedule.controller");

router.get("/", getAllSchedules);
router.get("/:id", getScheduleById);

router.post("/", verifyToken, createSchedule);
router.put("/:id", verifyToken, updateSchedule);
router.delete("/:id", verifyToken, deleteSchedule);

module.exports = router;
