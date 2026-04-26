const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Business = require("../models/Business");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/:businessId", async (req, res) => {
  try {
    const reviews = await Review.find({
      businessId: req.params.businessId,
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { businessId, rating, text } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newReview = new Review({
      businessId,
      userId: req.user.id,
      reviewerName: user.name,
      rating,
      text,
    });

    await newReview.save();

    const reviews = await Review.find({ businessId });
    const business = await Business.findById(businessId);

    business.reviewCount = reviews.length;
    const avg =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
    business.averageRating = Math.round(avg * 10) / 10;

    await business.save();

    res.json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's reviews for dashboard
router.get("/user/me", auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .populate("businessId", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
