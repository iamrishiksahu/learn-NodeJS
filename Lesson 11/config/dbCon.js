const mongooese = require('mongoose');

const connectDB = async () => {
    try {

        await mongooese.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB