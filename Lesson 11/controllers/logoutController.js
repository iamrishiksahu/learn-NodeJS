const User = require('../model/User');


const handleLogout = async (req, res) => {
    // On client => also delete the access token

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        // Checking if there is cookie and it has a jwt property
        return res.sendStatus(204); // Operation Successful but nothing to respond!
    }

    const refreshToken = cookies.jwt;

    // IS refresh token is in DB?
    const foundUser =  await User.findOne({refreshToken: refreshToken}).exec()

    if (!foundUser) {

        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204);

    }

    // Delete the refresh token from the database

    foundUser.refreshToken = '';
    const result = await foundUser.save();

    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' }) // secure: true => only serves in https (used in production)
    return res.sendStatus(204);

}


module.exports = { handleLogout }