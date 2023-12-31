const express = require('express');
const app = express();
const env = require('dotenv'); // importing dotenv for the port as an environment variable
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Routes Import:
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/initialData');
const pageRoutes = require('./routes/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/orders');
const homeRoutes = require('./routes/homePage')

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
app.use(cors()) // to follow the cors policy to make use of backend in the frontend as both frontend and backend are running on different ports
app.use('/public', express.static(path.join(__dirname, 'uploads'))); // joining curr file to uploads folder and serving upload folder as a static file to browser

app.use('/api', userRoutes);
app.use('/api', categoryRoutes); 
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', homeRoutes);

app.listen(process.env.PORT, () => {    
    console.log(`Server Chal Raha He Bhai at ${process.env.PORT}`);
})