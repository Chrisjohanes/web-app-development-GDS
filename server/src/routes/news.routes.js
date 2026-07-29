const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

// Public routes
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// Protected routes (butuh login admin)
router.post("/", verifyToken, createNews);
router.put("/:id", verifyToken, updateNews);
router.delete("/:id", verifyToken, deleteNews);

module.exports = router;
