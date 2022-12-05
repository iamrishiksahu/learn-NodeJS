const userDB = {
    users: require('../../Lesson 11/model/user.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');


const handleRefreshToken = (req, res) => {

    const cookies = req.cookies;

    if(!cookies?.jwt) {
        // Checking if there is cookie and it has a jwt property
        return res.sendStatus(401); 
    }

    
    const refreshToken = cookies.jwt;

    const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken)

    if (!foundUser) {
        return res.status(403).json({ "message:": "User does not exist!" });

    }

    // Evaluate JWT


    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if( err || foundUser.username !== decoded.username ){
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                {"username" : decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s"}
            );

            res.json( { accessToken } )

        }
    )

   

}


module.exports = { handleRefreshToken }