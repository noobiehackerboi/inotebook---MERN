const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const mongoURL = process.env.MONGO_URL

const connectToMongo = async () => {
    await mongoose.connect(mongoURL).then(() => console.log("Connected successfully")).catch(err => console.log(err));
}

module.exports = connectToMongo;