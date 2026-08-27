const mongoose = require('mongoose');

const DealerSchema = new mongoose.Schema({
  id: Number,
  city: String,
  state: String,
  st: String,
  address: String,
  zip: String,
  lat: Number,
  long: Number,
  full_name: String,
  short_name: String,
});

module.exports = mongoose.model('Dealer', DealerSchema, 'dealerships');