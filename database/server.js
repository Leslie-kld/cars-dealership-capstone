require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Dealer = require('./dealership');
const Review = require('./review');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Task 9: get all dealers
app.get('/fetchDealers', async (req, res) => {
  const dealers = await Dealer.find();
  res.json(dealers);
});

// Task 11: get dealers by state
app.get('/fetchDealers/:state', async (req, res) => {
  const dealers = await Dealer.find({ state: req.params.state });
  res.json(dealers);
});

// Task 10: get dealer by id
app.get('/fetchDealer/:id', async (req, res) => {
  const dealer = await Dealer.findOne({ id: req.params.id });
  res.json(dealer);
});

// Task 8: get reviews for a dealer id
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  const reviews = await Review.find({ dealership: req.params.id });
  res.json(reviews);
});

// Task 14/15: get all car makes and models (derived from reviews collection)
app.get('/fetchCarMakes', async (req, res) => {
  const reviews = await Review.find();
  const makesModels = {};
  reviews.forEach(r => {
    if (!makesModels[r.car_make]) makesModels[r.car_make] = new Set();
    makesModels[r.car_make].add(r.car_model);
  });
  const result = Object.entries(makesModels).map(([make, models]) => ({
    make, models: Array.from(models)
  }));
  res.json(result);
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));