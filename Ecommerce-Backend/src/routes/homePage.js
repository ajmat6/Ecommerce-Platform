const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const fetchuser = require('../middleware/fetchuser');
const { adminMiddleware } = require('../middleware/categoryMiddleware');
const Home = require('../models/HomePage')
const slugify = require('slugify');
const shortid = require('shortid');
const HomeTopicTitle = require('../models/HomeTopicTitle');
const HomeTopicProducts = require('../models/HomeTopicProducts');


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

router.post('/home/addtopic', fetchuser, adminMiddleware, async (req, res) => {
    try
    {
        const requestBody = {
            title: req.body.title,
            slug: `${slugify(req.body.title)}-${shortid.generate()}`,
        }

        // check if topic already exist or not:
        const alreadyExist = await HomeTopicTitle.findOne({title: req.body.title});
        if(alreadyExist) return res.status(400).json({error: "Topic Already Exist!"});
        
        const newTopic = await new HomeTopicTitle(requestBody);
        await newTopic.save()
        
        res.status(201).json(newTopic);
    }
    
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

router.get('/home/getTopics', fetchuser, adminMiddleware, async (req, res) => {
    try
    {
        const allTopics = await HomeTopicTitle.find({});
        if(allTopics) return res.status(200).json(allTopics);
        else return res.status(400).json({error: 'No Topics Found'});
    }
    
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

router.post('/home/addProduct', fetchuser, adminMiddleware, upload.single('productPic'), async (req, res) => {
    try
    {
        const payload = {
            title: req.body.title,
            products: {
                productName: req.body.productName,
                categoryId: req.body.categoryId,
                startingPrice: req.body.startingPrice
            }
        }
        
        if(req.file)
        {
            payload.products.productpic = `${process.env.CATEGORY_PICURL}/public/${req.file.filename}`
        }
        // check if the product already exist:
        // const alreadyProduct = await HomeTopicProducts.find({'products.productName': req.body.productName});
        // if(alreadyProduct) return res.status(400).json({error: "Product already exist!"})

        const product = await HomeTopicProducts.findOneAndUpdate({title: req.body.title},
            {
                $push:{
                    "products": payload.products
                }
            },
            {new: true}
        )
        
        if(product) return res.status(201).json(product);
        
        else
        {
            const newProduct = await new HomeTopicProducts(payload)
            await newProduct.save();
    
            return res.status(200).json(newProduct)
        }
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

router.get('/home/getProducts', async (req, res) => {
    const allHomeProducts = await HomeTopicProducts.find({}).populate('title', 'title');
    if(allHomeProducts) return res.status(200).json(allHomeProducts);
    else return res.status(400).json({message: "No products found!"})
})

module.exports = router;