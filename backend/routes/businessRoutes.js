const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const auth = require('../middleware/authMiddleware');
const requireOwner = require('../middleware/requireOwner');

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const businesses = await Business.find(query).sort({ averageRating: -1 });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, requireOwner, async (req, res) => {
  try {
    const newBusiness = new Business({
      ...req.body,
      owner: req.user.id
    });
    await newBusiness.save();
    res.json(newBusiness);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, requireOwner, async (req, res) => {
  try {
    let business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    if (business.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    business = await Business.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, requireOwner, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    if (business.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    await business.deleteOne();
    res.json({ message: 'Business removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
