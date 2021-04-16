const mongoose = require('mongoose');

const kindredSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    start: {
        type: String,
        enum: ['Human', 'Vampire'],
        required: true
    },
    age: {
        type: Number
    },
    clan: {
        type: String,
        enum: ['Not determined', 'Brujah', 'Gangrel', 'Malkavian', 'Nosferatu', 'Toreador', 'Tremere', 'Ventrue', 'Caitiff', 'Thin-Blooded']
    },
    ambition: String,
    desire: String,
    player_id: String
});

let Kindred = module.exports = mongoose.model('Kindred', kindredSchema);