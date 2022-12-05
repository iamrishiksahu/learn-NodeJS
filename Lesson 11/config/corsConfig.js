const whitelist = require('../config/allowedOrigins');

const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin ) {
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOption, whitelist