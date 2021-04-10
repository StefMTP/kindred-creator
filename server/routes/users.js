const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

// REGISTER USER
router.post('/register', [
    body('username', 'Username is required!').not().isEmpty(),
    body('password1', 'Password is required!').not().isEmpty(),
    body('password1', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('password2', 'Passwords do not match!').exists().custom((value, { req }) => value === req.body.password1),
    body('username').custom(async username => {
        const user = await User.findOne({ username });
        if (user)
            return Promise.reject('Username is already taken!');
    })
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password1, salt, (err, hash) => {
                if (err) return console.log(err);
                const user = new User({username: req.body.username, passwordHash: hash});
                user.save((err) => {
                    if (err) return console.log(err);

                    jwt.sign({uid: user.id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if (err) return console.log(err);
                        res.cookie('token', token, {httpOnly: true, sameSite: 'None', secure: true}).send();
                    });
                });
            });
        });
    }
});

// LOG IN
router.post('/login', [
    body('username', 'Fill in username.').not().isEmpty(),
    body('password', 'Fill in password.').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json(errors);
    } else {
        User.findOne({username: req.body.username}, (err, user) => {
            if(!user) return res.json({'errors': [{msg: 'Wrong username or password.'}]});
            bcrypt.compare(req.body.password, user.passwordHash).then(matches => {
                if(!matches) return res.json({'errors': [{msg: 'Wrong username or password.'}]});
                jwt.sign({uid: user.id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                    if (err) return console.log(err);
                    res.cookie('token', token, {httpOnly: true, sameSite: 'None', secure: true}).send();
                });
            });
        });
    }
});

// LOG OUT 
router.get('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), 
        sameSite: 'None', 
        secure: true
    }).send();
});

// CHECK IF USER IS LOGGED IN - OUR CLIENT NEEDS IT TO VALIDATE ITS TOKEN
router.get('/loggedIn', (req, res) => {
    try {
        // retrieve the token contained inside the http cookie
        const token = req.cookies.token;

        // if we did not get a token, that means that the request is unauthorized
        if(!token) {
            return res.json({loggedIn: false, uid: null, uname: null});
        }

        // if not, then we verify the token (if it's verifiable, if not an error will be caught)
        const sum = jwt.verify(token, process.env.JWT_SECRET);

        // if all other checks are ok, we can go on and send true
        User.findById(sum.uid, (err, user) => res.send({loggedIn: true, uid: user.id, uname: user.username}));
        
    } catch(err) {
        // if something went wrong, that means the token is not valid
        console.log(err);
        res.json({loggedIn: false, uid: null, uname: null});
    }
});

module.exports = router;