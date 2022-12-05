const userDB = {
    users: require('../../Lesson 11/model/user.json'),
    setUsers: function (data) { this.users = data }
}

const bcr = require('bcrypt')

const jwt = require('jsonwebtoken');

require('../model/user.json')
const fsPromises = require('fs').promises;
const path = require('path')


const handleLogin = async (req, res) => {

    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required!' })

    const foundUser = userDB.users.find((person) => person.username === user)

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
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(

            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );


        //Saving the refresh token into the DB
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);

        const currentUser = { ...foundUser, refreshToken };

        userDB.setUsers([...otherUsers, currentUser]);

        //Updating the DB with changed data
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(userDB.users))


        //Responding to the request


        //HTTP-Only cookie is not available to JS. So cannot be stolen by hackers
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); //1day

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