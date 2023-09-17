const express = require('express');
const router = express.Router();
const slugify = require('slugify'); // to make url of the categories
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { adminMiddleware } = require('../middleware/categoryMiddleware');
const Product = require('../models/Product'); // imporyting product model DB
const Category = require('../models/Category')
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

// const upload = multer({ dest: 'uploads/' }) // dest contains the destination directory of the uploaded files (files kaha save hogi) and this will create uploads folder automatically
const upload = multer({ storage }); // the destination of the storage is defined in the storage function

// End point to create a product:
router.post('/product/create', fetchuser, adminMiddleware, upload.array('productPicture') , async (req, res) => { // uploading an array of file (the name here for files should be same to be used in the body of postman)
    try
    {
        // Destructuring and extracting parameters from the request body:
        const {
            name,
            price,
            description,
            quantity,
            category,
        } = req.body;

        let productPic = [];  // array of pictures

        if(req.files.length > 0)
        {
            productPic = req.files.map((file) => {
                return {img: file.filename} // productPicture is an array of pictures with object containing img which stores name of the image in the db. filename is the name of the file that you will recieve in the request
            });
        }

        // creating new object of the Product model:
        const product = await new Product({
            name: name,
            slug: slugify(name),
            price,
            description,
            quantity,
            productPic,
            category,
            createdBy: req.user.id // you will recieve this using fetchuser middleware 
        });

        // saving the object:
        product.save()
        .then(() => {
            res.status(200).json({
                // file: req.file, // if you are using upload.single (for recieving a single file)
                // file: req.files, // if you are using upload.array (for recieving multiple files)
                // body: req.body

                product
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({error});
        })
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
});

// end point to fetch products by slug:
router.get('/product/:slug', async (req, res) => {
    try
    {
        // extracting slug from the parameters of the request:
        const {slug} = req.params; 

        // finding category of the slug:
        const category = await Category.findOne({slug: slug}).select('_id type');

        // if category is found then fetch all the products of the category:
        if(category)
        {
            const products = await Product.find({category: category._id})

            if(category.type)
            {
                if(products.length > 0)
                {
                    // sending response of the products by filtering them according to the price range:
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price <= 10000 && product.price > 5000),
                            under20k: products.filter(product => product.price <= 20000 && product.price > 10000),
                            under30k: products.filter(product => product.price <= 30000 && product.price > 20000),
                            under50k: products.filter(product => product.price <= 50000 && product.price > 30000),
                            under100k: products.filter(product => product.price <= 100000 && product.price > 50000),
                            above100k: products.filter(product => product.price > 100000),
                        }
                    });
                }
                else
                {
                    res.status(200).json({error: "No! Products of the this category"})
                }
            }

            // when there is no type of the category, then we will not send products by price in response:
            else
            {
                return res.status(200).json({products});
            }
        }
        else
        {
            return res.status(400).json({error: "Category of product not found"})
        }
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

// api end point to fetch a single product's details:
router.get('/product/productDetails/:productId', async (req, res) => {
    try
    {
        const {productId} = req.params;
    
        // find a product if exist of the same id:
        const product = await Product.findOne({_id: productId});
    
        if(product)
        {
            res.status(200).json(product);
        }

        else
        {
            res.status(400).json({error: "Enter valid Parameters"})
        }

    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }

})


module.exports = router;