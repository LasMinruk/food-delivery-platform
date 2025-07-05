const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Add a restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res.json(restaurant);
});

// Get all restaurants
router.get('/', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// Update restaurant availability
router.put('/:id', async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    { isOpen: req.body.isOpen },
    { new: true }
  );
  res.json(restaurant);
});

module.exports = router;
