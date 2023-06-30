const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // importing Category model
const slugify = require('slugify') // 

router.post('/category/create', async (req, res) => {
    try
    {
        // category req info:
        const categoryData = {
            name: req.body.name,
            slug: slugify(req.body.name)
        }
    
        // checking if parentId exist in the request body:
        if(req.body.parentId)
        {
            categoryData.parentId = req.body.parentId
        }

        // creating new object of Category model:
        const _category = await new Category(categoryData);

        // Saving new object:
        _category.save();

        // sending response for the succesful category addition:
        res.status(200).json({_category});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
});

module.exports = router; // this routers end points will act as a middleware in our main index.server.js file where the end point will start with /api