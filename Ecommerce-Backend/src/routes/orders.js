const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { userMiddleware } = require('../middleware/categoryMiddleware');
const Orders = require('../models/Orders');
const Cart = require('../models/Cart');

router.post('/user/addOrder', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // if the order is placed for the products in the cart, then there is no need to keep them in cart, delete them:
        const cleanCart = await Cart.deleteOne({userId: req.user.id})

        // adding userId into the req body:
        req.body.userId = req.user.id;
    
        const order = await new Orders(req.body);
    
        order.save()
        .then(() => {
            res.status(201).json({order});
        })
        .catch((error) => {
            res.status(400).json({error});
        })
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

router.get('/user/getOrders', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // finding all orders of the user by id:
        const allOrders = await Orders.find({userId: req.user.id})
                                                                .select("_id paymentStatus items")
                                                                .populate('items.productId', '_id name productPic')
    
        if(allOrders)
        {
            res.status(200).json({allOrders});
        }

        else return res.status(400).json({error: "Some error occured"})
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})



module.exports = router;