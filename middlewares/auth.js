const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    console.log(req.headers);

    // check that this token exists
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Access not permitted" });
    } else {

        // check the validity of this token
        let token = req.headers.authorization.split(" ")[1];

        // check the validity of this token
        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if(err) {
                res.status(500).json({ msg: "Error: unable to identify the token", err });
            } else {
                req.user = decoded;
                next();
            }

        })
    }

};