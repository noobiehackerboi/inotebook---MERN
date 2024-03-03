const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

// Connecting to the Database
connectToMongo();
const app = express();

const port = process.env.PORT;

// Middleware to enable cors
app.use(cors());

// Middleware to read json in express
app.use(express.json());

// for testing the server when it is live
app.get('/', (req, res) => {
    res.status(200).send('The server is live and running')
})

// Available Routes
app.use('/routes/auth', require('./routes/auth'));
app.use('/routes/notes', require('./routes/notes'));

// server log
app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.HOST}:${port}`);
})