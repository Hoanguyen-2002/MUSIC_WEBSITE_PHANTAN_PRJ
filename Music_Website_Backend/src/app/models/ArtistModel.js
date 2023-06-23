const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistModel = new Schema({
    id: {type: String, require: true},
    name: String,
    link: String,
    cover: String,
    thumbnail: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('artist_information', artistModel);
