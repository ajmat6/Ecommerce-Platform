const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const fetchuser = require('../middleware/fetchuser');
const { adminMiddleware } = require('../middleware/categoryMiddleware');
const Page = require('../models/PageM')

router.post('/create/page', fetchuser, adminMiddleware, upload.fields([ // if you taking multiple input fields of file
    {name: 'bannerImages'}, // name is input field in req .one more argument that can be passed is maxCount which specifies no of images that you want to take. Default is unlimited
    {name: 'productImages'}
]), async (req, res) => {
    try
    {
        // extracting images from the request and adding their pulic path and its redirect link and adding back to req:
        const {bannerImages, productImages} = req.files;
        if(bannerImages.length > 0)
        {
            req.body.bannerImages = bannerImages.map((banner, index) => 
                ({
                    img: `${process.env.CATEGORY_PICURL}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId:${req.body.categoryId}&type=${req.body.type}`
                })
            )
        }
    
        if(productImages.length > 0)
        {
            req.body.productImages = productImages.map((product, index) => 
                ({
                    img: `${process.env.CATEGORY_PICURL}/public/${product.filename}`,
                    navigateTo: `/productClicked?categoryId:${req.body.categoryId}&type=${req.body.type}`
                })
            )
        }

        // adding user to request:
        req.body.createdBy = req.user.id;

        const page = await new Page(req.body);
        page.save()
        .then(() => {
            res.status(200).json({page});
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

module.exports = router;