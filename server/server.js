const express = require('express');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Mongo DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri, 
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true
    },
    (err) => {
    if (err) return console.log(err);
    console.log('Connected with MongoDB successfully');
});

//Middleware
app.use(express.json());
app.use(cookie_parser());
app.use(cors({
    origin: '*',
    credentials: true,
}));

//Routes
app.use('/auth', require('./routes/users'));
app.use('/kindred', require('./routes/kindred'));

//Connect
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));