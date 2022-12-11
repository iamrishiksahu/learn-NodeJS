const User = require('../model/User');

const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        // Checking if there is cookie and it has a jwt property
        return res.sendStatus(401);
    }


    const refreshToken = cookies.jwt;

    const foundUser =  await User.findOne({refreshToken: refreshToken}).exec()

    if (!foundUser) {
        return res.status(403).json({ "message:": "User does not exist!" });

    }

    // Evaluate JWT


    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            );

            res.json({ accessToken })

        }
    )



}


module.exports = { handleRefreshToken }