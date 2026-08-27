require('dotenv').config();
const mongoose = require('mongoose');
const Dealer = require('./dealership');
const Review = require('./review');
const dealers = require('./seed_dealers.json');
const reviews = require('./seed_reviews.json');

mongoose.connect(process.env.MONGO_URI, { family: 4 }).then(async () => {
  await Dealer.deleteMany({});
  await Review.deleteMany({});
  await Dealer.insertMany(dealers);
  await Review.insertMany(reviews);
  console.log('Seed data loaded');
  mongoose.disconnect();
});