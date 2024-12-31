const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
