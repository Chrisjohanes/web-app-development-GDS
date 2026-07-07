const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  submitContact,
  getAllContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contact.controller");

// Public - jemaat kirim pesan
router.post("/", submitContact);

// Protected - admin kelola pesan masuk
router.get("/", verifyToken, getAllContacts);
router.put("/:id/read", verifyToken, markAsRead);
router.delete("/:id", verifyToken, deleteContact);

module.exports = router;
