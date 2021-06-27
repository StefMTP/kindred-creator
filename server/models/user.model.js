const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);