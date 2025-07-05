require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const restaurantRoutes = require('./routes/restaurant');
const menuRoutes = require('./routes/menu');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'));

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
