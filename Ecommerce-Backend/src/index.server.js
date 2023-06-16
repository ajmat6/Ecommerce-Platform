const express = require('express');
const app = express()
const env = require('dotenv') // importing dotenv for the port as an environment variable

// Using env variable (Port no)
env.config();

// Middleware to parse the data coming as json in the req body:
app.use(express.json());

// Hello API:
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello! This is Server"
    })
})

// Hello API:
app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server Chal Raha He Bhai at ${process.env.PORT}`);
})