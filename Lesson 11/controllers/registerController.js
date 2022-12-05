const userDB = {
    users: require('../../Lesson 11/model/user.json'),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')


const handleNewUser = async (req, res) => {

    const{ user, pwd } = req.body

    if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required!'})

    //check for duplicate usernames in the database
    const duplicate = userDB.users.find(person => person.username === user)

    if(duplicate) return res.sendStatus(409)

    try{

        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        // store the new user
        const newUSer = {
            username: user,
            roles: {
                User: 2001
            },
            password: hashedPwd
        }

        userDB.setUsers([...userDB.users, newUSer])

        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(userDB.users))

        console.log(userDB.users);
        res.status(201).json({'message' : `New user created ${user}`})

    }catch (err) {
        res.status(500) //Internal server error
        .json({'message of caught error:' : err.message})
    }

}

module.exports = { handleNewUser }