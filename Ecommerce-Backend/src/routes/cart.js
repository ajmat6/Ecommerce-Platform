const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { userMiddleware } = require('../middleware/categoryMiddleware');

router.post('/user/cart/add-to-cart', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        const cart = new Cart({
            userId: req.user.id, // coming from fetchuser middleware
            cartItems: req.body.cartItems
        });

        cart.save()
        .then(() => {
            res.status(200).json({cart});
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json({error});
        })
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
});



module.exports = router;