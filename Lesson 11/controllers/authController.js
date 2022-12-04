const userDB = {
    users: require('../../Lesson 11/model/user.json'),
    setUsers: function (data) {this.users = data}
}

const bcr = require('bcrypt')

const handleLogin = async (req, res) =>{

    const{ user, pwd } = req.body

    if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required!'})
    
    const foundUser = userDB.users.find( (person) => person.username === user )

    if(!foundUser) {
        return res.status(401).json({"message:" : "User does not exist!" });

    }

    //evaluate the password
    const match = await bcr.compare(pwd, foundUser.password);

    if(match){
        // create JWTs
        res.status(200).json({ 'success: ': `Welcome ${user}! Login success!`});
    }else{
        res.status(401).json({ 'Login Failed: ' : `Password for ${user} is wrong!`});
    }
 
}


module.exports = {handleLogin}