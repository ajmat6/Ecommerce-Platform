const express = require('express');
const app = express();
const env = require('dotenv'); // importing dotenv for the port as an environment variable
const mongoose = require('mongoose');

// Routes Import:
const userRoutes = require('./routes/user');

// Using env variable (Port no)
env.config();

// MongoDB connection
// mongodb+srv://ajmat1130666:Ak8440800877Ak@cluster0.kvw3z7z.mongodb.net/
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kvw3z7z.mongodb.net/`,
    { 
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(() => {
    console.log("Database Connected")
})

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