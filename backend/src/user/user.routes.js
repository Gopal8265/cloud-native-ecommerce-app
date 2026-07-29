const express = require("express");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Route
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: req.user,
  });
});

module.exports = router;
