const express = require('express')
const router = express.Router();

// importing models:
const category = require('../models/Category');
const product = require('../models/Product');

// function to get all the categories: Initially parentId will be null and then recursively all their children will be fetched:
function getCategoriesFunction(categories, parentId = null)
{
    const categoryList = [];
    let category;

    // if parent id is null fetch all categories not having a parentId:
    if(parentId == null)
    {
        category = categories.filter((cat) => cat.parentId == undefined)
    }

    // if parent id is present fetch the category having that parentId:
    else
    {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    // Traversing through the category array created above and pushing its elements into categoryList:
    for(let catt of category)
    {
        categoryList.push({
            _id: catt._id,
            name: catt.name,
            parentId: catt.parentId,
            slug: catt.slug,
            children: getCategoriesFunction(categories, catt._id) // Recursively calling the function to fetch all the subcategories of a category
        });
    }

    return categoryList;
};

router.post('/initialdata', async (req, res) => {

    try
    {
        // fetching all the categories and products:
        // .select method is used to filter and fetch only the mentioned things in the select funtions
        // .populate method fills the details of category id from the category modal (working like foreign key)
        const categories = await category.find({})
        const products = await product.find({})
                                              .select('_id name quantity price description slug productPic category') // selecting what to fetch (here only id name and category which is category id)
                                            //   .populate('category') // will populate category details using category id
    
        res.status(200).json({
            categoryList: getCategoriesFunction(categories),
            products
        })
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times"); 
    }

})

module.exports = router;