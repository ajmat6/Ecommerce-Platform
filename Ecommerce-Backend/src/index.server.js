const express = require('express');
const app = express();
const env = require('dotenv'); // importing dotenv for the port as an environment variable
const mongoose = require('mongoose');

// Routes Import:
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');

// Using env variable (Port no)
env.config();

// MongoDB connection
// mongodb+srv://ajmat1130666:Ak8440800877Ak@cluster0.kvw3z7z.mongodb.net/
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kvw3z7z.mongodb.net/`,
    { 
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
).then(() => {
    console.log("Database Connected")
})

// Middleware to parse the data coming as json in the req body:
app.use(express.json());

app.use('/api', userRoutes); // middleware and every route to be start with /api
app.use('/api', categoryRoutes); 
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Chal Raha He Bhai at ${process.env.PORT}`);
})