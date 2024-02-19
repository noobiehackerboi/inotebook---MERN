const mongoose = require('mongoose')
const dotenv = require('dotenv');

// FILE STRUCTURE IN MONGO DB
// Cluster0
// Collections -> data
// Database -> user , notes

dotenv.config();
const mongoURL = `mongodb+srv://${process.env.ADMIN}:${process.env.PASS}@${process.env.CLUSTER_NAME}.mongodb.net/data?retryWrites=true&w=majority`

const connectToMongo = async () => {
    await mongoose.connect(mongoURL).
        then(() => console.log("Connected successfully")).
        catch(err => console.log(err));
}

module.exports = connectToMongo;