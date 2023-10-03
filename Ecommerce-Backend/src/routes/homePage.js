const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const fetchuser = require('../middleware/fetchuser');
const { adminMiddleware } = require('../middleware/categoryMiddleware');
const Home = require('../models/HomePage')
router.post('/home/banners', fetchuser, adminMiddleware, upload.array('banners'), async (req, res) => {
    try
    {
        // extracting images from the request and adding their pulic path and its redirect link and adding back to req:
        const {banners} = req.files;
        console.log(req.files)
        if(req.files.length > 0)
        {
            req.body.banners = req.files.map((banner, index) => 
                ({
                    img: `${process.env.CATEGORY_PICURL}/public/${banner.filename}`,
                    // navigateTo: `/bannerClicked?cid=${req.body.categoryId}&type=${req.body.type}`
                })
            )
        }

        console.log(req.body)

        const allBanners = await new Home(req.body);
        allBanners.save()
        .then(() => {
            res.status(201).json({allBanners});
        })
        .catch((error) => {
            res.status(400).json({error})
        })
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");  
    }
})

// router to get a page
router.get('/getbanners', async (req, res) => {
    try
    {
        const allBanners = await Home.find({});
        if(allBanners)
        {
            return res.status(200).json({allBanners});
        }
    
        else return res.status(400).json({message: "No banners found"});
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");  
    }
})

module.exports = router;