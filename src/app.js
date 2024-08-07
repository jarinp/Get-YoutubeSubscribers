const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const subscriberModel = require('./models/subscribers');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// Get all subscribers
app.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await subscriberModel.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get subscribers' names and channels
app.get('/subscribers/names', async (req, res) => {
    try {
        const subscribers = await subscriberModel.find({}, { name: 1, subscribedChannel: 1, _id: 0 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a subscriber by ID
app.get('/subscribers/:id', async (req, res) => {
    try {
        const subscriber = await subscriberModel.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Handle 404 - Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
