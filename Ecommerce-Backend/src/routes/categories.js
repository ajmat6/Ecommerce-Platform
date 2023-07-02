const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // importing Category model
const slugify = require('slugify'); // to make url of the categories
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { adminMiddleware } = require('../middleware/categoryMiddleware'); // admin middleware to make sure that only admin can create a category


// End point to create a category: to create first you should be signed in and you should be a admin
router.post('/category/create', fetchuser, adminMiddleware, async (req, res) => {
    try
    {
        // category req info:
        const categoryData = {
            name: req.body.name,
            slug: slugify(req.body.name)
        }
    
        // checking if parentId exist in the request body (if present store in db):
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

// End point to fetch all the categories:
router.get('/category/getcategories', async (req, res) => {
    try
    {
        // Fetching all the categories:
        const category = await Category.find({});

        if(!category)
        {
            return res.status(400).json({error: "No categories found"});
        }

        else
        {
            res.status(200).json({category});
        }
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
});

module.exports = router; // this routers end points will act as a middleware in our main index.server.js file where the end point will start with /api