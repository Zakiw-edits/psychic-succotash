const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Video = require('../models/Video');

// POST endpoint for video upload
router.post('/', (req, res) => {
    if (!req.files || !req.files.video) {
        return res.status(400).send('No video file uploaded.');
    }

    const video = req.files.video;
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi'];
    if (!allowedTypes.includes(video.mimetype)) {
        return res.status(400).send('Invalid file type. Only MP4, MKV, and AVI are allowed.');
    }

    if (video.size > 50 * 1024 * 1024) { // 50MB limit
        return res.status(400).send('File size exceeds 50MB limit.');
    }

    const uploadPath = path.join(__dirname, '../uploads/', `${Date.now()}_${video.name}`);
    video.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading video to local storage.');
        }

        const newVideo = new Video({
            name: video.name,
            url: `/uploads/${path.basename(uploadPath)}`
        });

        newVideo.save()
            .then(() => res.send({ message: 'Video uploaded successfully!', filePath: `/uploads/${path.basename(uploadPath)}` }))
            .catch(err => res.status(500).send('Failed to save video metadata.'));
    });
});

module.exports = router;
