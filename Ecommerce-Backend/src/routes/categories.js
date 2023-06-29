const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // importing Category model

router.post('/category/create', (req,res) => {

    // category req info:
    const categoryData = {
        name: req.body.name,
    }
})

module.exports = router; // this routers end points will act as a middleware in our main index.server.js file where the end point will start with /api