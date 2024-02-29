const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable cors
app.use(cors());

// Middleware to read json in express
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// Available Routes
app.use('/routes/auth', require('./routes/auth'));
app.use('/routes/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.HOST}:${port}`);
})