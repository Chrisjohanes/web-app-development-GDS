const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getAllSermons,
  getSermonById,
  createSermon,
  updateSermon,
  deleteSermon,
} = require("../controllers/sermon.controller");

router.get("/", getAllSermons);
router.get("/:id", getSermonById);

router.post("/", verifyToken, createSermon);
router.put("/:id", verifyToken, updateSermon);
router.delete("/:id", verifyToken, deleteSermon);

module.exports = router;
