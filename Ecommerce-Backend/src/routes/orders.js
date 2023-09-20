const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { userMiddleware, adminMiddleware } = require('../middleware/categoryMiddleware');
const Orders = require('../models/Orders');
const Cart = require('../models/Cart');
const Address = require('../models/Address');

router.post('/user/addOrder', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // if the order is placed for the products in the cart, then there is no need to keep them in cart, delete them:
        const cleanCart = await Cart.deleteOne({userId: req.user.id})

        // adding userId into the req body:
        req.body.userId = req.user.id;

        // adding order status:
        req.body.orderStatus = [
            {
                type: 'ordered',
                date: new Date(),
                isCompleted: true
            },

            {
                type: 'packed',
                isCompleted: false
            },

            {
                type: 'shipped',
                isCompleted: false
            },

            {
                type: 'delivered',
                isCompleted: false
            }
        ]
    
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


// end point to fetch all details of a single order with its address details:
router.get('/user/orderDetails', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // finding the order:
        // lean is used to address property to order below. Becoz without it, it is mongoose document and it does not allow to modify it. Using lean document is converted into plaibn js object and now you can add more properties to it.
        const order = Orders.findOne({_id: req.body.orderId}).lean(); 

        // if order is found, find the address of that order:
        if(order)
        {
            const address = Address.findOne({user: req.user.id});

            // if all the addresses of the that order user is found, find the address which the user has requested for delivery and adding it to order:
            if(address)
            {
                // order.address = address.address.find((add) => add._id.toString() === order.addressId.toString());
                order.address = address.address[0]
            }

            res.status(200).json({order});
        }
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

// API end point to fetch all customer orders details with their name:
router.get('/admin/getCustomerOrders', fetchuser, adminMiddleware, async (req, res) => {
    try
    {
        const orders = await Orders.find({}).populate('items.productId', 'name');
        res.status(200).json({orders});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

// API end point to update the status of the order:
router.post('/admin/updateorder', fetchuser, adminMiddleware, async (req, res) => {
    try
    {

        const updatedOrder = await Orders.updateOne({_id: req.body.orderId, "orderStatus.type": req.body.type}, {
            $set: {
                "orderStatus.$": [{type: req.body.type, date: new Date(), isCompleted: true}]
            }
        })
    
        return res.status(201).json({updatedOrder})
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})



module.exports = router;