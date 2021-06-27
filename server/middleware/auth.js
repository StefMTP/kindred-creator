const jwt = require('jsonwebtoken');
require('dotenv').config();

// Custom middleware that checks if user is authenticated
const auth = (req, res, next) => {
    try {
        // retrieve the token contained inside the http cookie
        const token = req.cookies.token;

        // if we did not get a token, that means that the request is unauthorized
        if(!token) {
            return res.status(401).json({'error': 'unauthorized'});
        }

        // if not, then we verify the token to get the user id (if it's verifiable, if not an error will be caught) and pass it in the request to follow
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            uid: verified.uid,
            is_admin: verified.is_admin
        };
        next();

    } catch(err) {
        // if something went wrong, that means the token is not valid, but let's not give that info straight away, let's just lie 
        console.log(err);
        res.status(401).json({'error': 'unauthorized'});
    }
}

module.exports = auth;