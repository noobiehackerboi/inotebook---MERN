const mongoose = require('mongoose')
const mongoURL = ""

const connectToMongo = ()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("Connected to database");
    })
}
module.exports = connectToMongo;