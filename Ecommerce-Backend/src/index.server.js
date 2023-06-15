const express = require('express');
const app = express()
const env = require('dotenv') // importing dotenv for the port as an environment variable

// Using env variable (Port no)
env.config();

app.listen(process.env.PORT, () => {
    console.log(`Server Chal Raha He Bhai at ${process.env.PORT}`);
})