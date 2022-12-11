const User = require('../model/User');
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {

    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required!' })

    const foundUser =  await User.findOne({username: user}).exec()

    if (!foundUser) {
        return res.status(401).json({ "message:": "User does not exist!" });

    }

    //evaluate the password
    const match = await bcr.compare(pwd, foundUser.password);

    if (match) {
        // create JWTs

        const roles = Object.values(foundUser.roles)

        const accessToken = jwt.sign(

            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '600s' }
        );
        const refreshToken = jwt.sign(

            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );


        //Saving the refresh token into the DB
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        console.log(result);

        //Responding to the request
        //HTTP-Only cookie is not available to JS. So cannot be stolen by hackers
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //1day

        res.status(200).json(
            {
                'success: ': `Welcome ${user}! Login success!`,
                "accessToken": accessToken
            }
        );
    } else {
        res.status(401).json({ 'Login Failed: ': `Password for ${user} is wrong!` });
    }

}


module.exports = { handleLogin }