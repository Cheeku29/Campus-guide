const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Food', 'Cafe', 'Stationery', 'PG'], required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
