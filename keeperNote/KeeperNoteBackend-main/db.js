const mongoose = require("mongoose");
const connectToMongodb = () => {
    mongoose.connect(process.env.DB_URL)
    }


module.exports = connectToMongodb; 