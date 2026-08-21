// server.js

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('public'));

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
let db;

MongoClient.connect(uri)
  .then((client) => {
    console.log('MongoDB connected successfully!');
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Test route
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

// POST route - notun item add korার jonno
app.post('/api/items', async (req, res) => {
  try {
    const { itemName, description, location, date, contactInfo } = req.body;

    if (!itemName || !description || !location) {
      return res.status(400).json({ error: 'Item name, description, and location are required' });
    }

    const newItem = {
      itemName,
      description,
      location,
      date: date || new Date().toISOString(),
      contactInfo,
      createdAt: new Date()
    };

    const result = await db.collection('items').insertOne(newItem);
    res.status(201).json({ message: 'Item added successfully', id: result.insertedId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET route - pagination soho shob item fetch korার jonno
app.get('/api/items', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalItems = await db.collection('items').countDocuments();
    const items = await db.collection('items')
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      items,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});