const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        return await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConnect;