const userDB = {
    users: require('../../Lesson 11/model/user.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path')

const handleLogout = async (req, res) => {
    // On client => also delete the access token

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        // Checking if there is cookie and it has a jwt property
        return res.sendStatus(204); // Operation Successful but nothing to respond!
    }

    const refreshToken = cookies.jwt;

    // IS refresh token is in DB?
    const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken)

    if (!foundUser) {

        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204);

    }

    // Delete the refresh token from the database

    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);

    const currentUser = {...foundUser, refreshToken: ''};

  
    userDB.setUsers([...otherUsers, currentUser]);

    // Writing the changes into the DB

    await fsPromises.writeFile( (path.join(__dirname, '..', 'model', 'user.json')) , JSON.stringify(userDB.users) );


    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' }) // secure: true => only serves in https (used in production)
    return res.sendStatus(204);

}


module.exports = { handleLogout }