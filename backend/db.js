const mongoose = require('mongoose');

// FILE STRUCTURE IN MONGO DB
// Cluster0
// Collections -> data
// Database -> user , notes

    // 1. User database
    //     a. email(String,required,unique)
    //     b. password(String,required)
    //     c. name(String,required)
    //     d. date(Date,Date.now)

    // 2. User database
    //     a. user(mongoose.Schema.Types.ObjectId,user)
    //     b. title(String,required)
    //     c. description(String,required)
    //     d. tag(String,"general")
    //     e. date(Date,Date.now)

// Exporting keys and environment variables to connect to DB
const mongoURL = `mongodb+srv://${process.env.ADMIN}:${process.env.PASS}@${process.env.CLUSTER_NAME}.mongodb.net/data?retryWrites=true&w=majority`;

const connectToMongo = async () => {
    await mongoose.connect(mongoURL).
        then(() => console.log("Connected successfully")).
        catch(err => console.log(err));
}

module.exports = connectToMongo;