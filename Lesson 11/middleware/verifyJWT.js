const jwt = require('jsonwebtoken');

const verifyJWT =  (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.sendStatus(401); //Unauthorized

    console.log(authHeader); //Beareer Token

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); //Something went wrong! (Invalid Token)

            req.user= decoded.username //Since we had username in the JWT sign
            next();
        }
    )
}

module.exports = verifyJWT