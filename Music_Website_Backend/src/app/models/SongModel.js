const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songModel = new Schema({
    id: {type: String, require: true},
    thumb: String,
    artist: String,
    artistIds: String,
    duration: String,
    block: String,
    hasVideo: Boolean,
    videoLink: String,
    name: String,
    genre: String,
    
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('song_information', songModel);
