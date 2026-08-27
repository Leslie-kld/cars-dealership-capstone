const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  id: Number,
  name: String,
  dealership: Number,
  review: String,
  purchase: Boolean,
  purchase_date: String,
  car_make: String,
  car_model: String,
  car_year: Number,
  sentiment: String,
});

module.exports = mongoose.model('Review', ReviewSchema, 'reviews');