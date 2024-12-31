const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

// GET endpoint for fetching videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).send('Error fetching videos.');
    }
});

module.exports = router;
