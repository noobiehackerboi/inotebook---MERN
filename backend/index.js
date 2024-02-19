const connectToMongo = require('./db')
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

// Middleware to read json in express
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// Available Routes
app.use('/routes/auth', require('./routes/auth'));
app.use('/routes/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})