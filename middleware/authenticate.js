const jwt = require ('jsonwebtoken');
const secret = "This is the json web token secret";

const authenticate = (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return new Error ("You are not authorised");
        }

        let token = req.headers.authorization.split('')[1];

        let auth = jwt.verify(token, secret);

        //console.log(auth);
        if (auth.userId != req.bodyidUser){

            //console.log(req.body.idUser);
            throw new Error ("You do not have permission to perform this action");
        }
        return next();

    }catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

module.exports = authenticate;