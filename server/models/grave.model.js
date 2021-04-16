const mongoose = require('mongoose');

const graveSchema = new mongoose.Schema({
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

let Grave = module.exports = mongoose.model('Grave', graveSchema);