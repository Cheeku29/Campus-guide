const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const auth = require('../middleware/authMiddleware');
const requireOwner = require('../middleware/requireOwner');

router.get('/businesses', auth, requireOwner, async (req, res) => {
  try {
    const businesses = await Business.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
