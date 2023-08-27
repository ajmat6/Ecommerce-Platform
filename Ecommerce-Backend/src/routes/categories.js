const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // importing Category model
const slugify = require('slugify'); // to make url of the categories
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { adminMiddleware } = require('../middleware/categoryMiddleware'); // admin middleware to make sure that only admin can create a category
const multer = require('multer'); // importing multer to upload files
const shortid = require('shortid'); // to create a short id of the file uploaded
const path = require('path');

// to read files uploaded using multer as files uploaded using multer are not readable(taken from docs)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads')) // destination folder path using path.join
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname) // short id will generate some random name for the file uploaded which will be suffixed by the file.originalname that is received in the req.file
    }
});

const upload = multer({ storage }); // the destination of the storage is defined in the storage function

// End point to create a category: to create first you should be signed in and you should be a admin
router.post('/category/create', fetchuser, adminMiddleware, upload.single('categoryPic'), async (req, res) => {
    try
    {
        
        // category req info:
        const categoryData = {
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${shortid.generate()}`, // shortid is used to generate a unique slug for each category created
        }
        
        // checking if category have a pic in the request:
        if(req.file)
        {
            let categoryPicURL = process.env.CATEGORY_PICURL + '/public/' + req.file.filename // creating a url for the categoryPic (link is made env variable as it will change in future (jo part change ho sakta he))
            categoryData.categoryImage = categoryPicURL // adding above url in categoryPic key of the category model
        }

        // checking if parentId exist in the request body (if present store in db):
        if(req.body.parentId)
        {
            categoryData.parentId = req.body.parentId
        }

        // checking if the category already exist in the database or not:
        const alreadyCategory = await Category.findOne({name: req.body.name});
        if(alreadyCategory)
        {
            return res.status(400).json({ error: "Category already exist"});
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
            type: catt.type,
            children: getCategoriesFunction(categories, catt._id) // Recursively calling the function to fetch all the subcategories of a category
        });
    }

    return categoryList;
};

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
            const categoryList = getCategoriesFunction(category); // fetching all the categories recursively in the category -> subcategory order
            res.status(200).json({categoryList});
        }
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
});

// end point to update the category:
router.post('/category/update', fetchuser, adminMiddleware, upload.array('categoryPic'), async (req, res) => {
    try
    {
        const {_id, name, parentId, type} = req.body;
        const updatedCategories = []; // array to push updated categories after updating
    
        // if there are multiple category to update in the request -> means there is an array coming in request to update categories:
        // name, parentId and type all have same length as all category to udpdate has its name, parentId and type:
        if(name instanceof Array)
        {
            // iterating over category to be updated:
            for(let i=0; i<name.length; i++)
            {
                // extracting name, type from req:
                const category = {
                    name: name[i],
                    type: type[i]
                }
                // extracting parentId from req if present:
                if(parentId[i] !== "")
                {
                    category.parentId = parentId[i];
                }
    
                // finding category in DB that has to be updated:
                // findOneAndUpdate by default return object of previous state before update but if you want to get object after updating, mention new: true
                const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true})
                updatedCategories.push(updatedCategory);

            }
            return res.status(201).json({updatedCategories: updatedCategories});
        }

        // if there is single category to update in the request:
        else
        {
            const category = {
                name, 
                type
            }
            if(parentId !== "")
            {
                category.parentId = parentId;
            }

            const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true})
            return res.status(201).json({updatedCategory})
        }
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

// end point to delete the categories:
router.post('/category/delete', fetchuser, adminMiddleware, async (req, res) => {
    try
    {
        // extracting ids from the body:
        const ids = req.body;

        const deletedCategories = [];

        // iterating over requested category Ids for deletion:
        for(let i=0; i<ids.length; i++)
        {
            const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id}) // look at frontend
            deletedCategories.push(deleteCategory);
        }

        // verifying deleted Categories and actual requested categories are equal or not:
        if(deletedCategories.length === ids.length)
        {
            return res.status(201).json({deletedCategories: deletedCategories});
        }

        else return res.status(400).json({message: "Some went wrong in deleting categories"})
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
});

module.exports = router; // this routers end points will act as a middleware in our main index.server.js file where the end point will start with /api