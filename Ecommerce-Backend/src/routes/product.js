const express = require('express');
const router = express.Router();
const slugify = require('slugify'); // to make url of the categories
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { adminMiddleware } = require('../middleware/categoryMiddleware');
const Product = require('../models/Product'); // imporyting product model DB
const multer = require('multer'); // importing multer to upload files
const shortid = require('shortid'); // to create a short id of the file uploaded
const upload = multer({ dest: 'uploads/' }) // dest contains the destination directory of the uploaded files (files kaha save hogi) and this will create uploads folder automatically

// to read files uploaded using multer as files uploaded using multer are not readable(taken from docs)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads') // destination folder name
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname) // short id will generate some random name for the file uploaded which will be suffixed by the file.originalname that is received in the req.file
    }
});

// End point to create a product:
router.post('/product/create', fetchuser, adminMiddleware, upload.single('productPicture') , async (req,res) => { // uploading a single file
    try
    {
        res.status(200).json({
            file: req.file, // this file will be the productPicture above that will be stored in the uploads folder
            body: req.body
        })
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
});




module.exports = router;