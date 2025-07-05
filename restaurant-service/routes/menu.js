const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Add menu item
router.post('/', async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.json(item);
});

// Get menu items for a restaurant
router.get('/:restaurantId', async (req, res) => {
  const items = await MenuItem.find({ restaurantId: req.params.restaurantId });
  res.json(items);
});

// Update menu item
router.put('/:id', async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
