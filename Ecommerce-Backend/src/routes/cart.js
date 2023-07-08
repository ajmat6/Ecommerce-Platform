const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { userMiddleware } = require('../middleware/categoryMiddleware');

router.post('/user/cart/add-to-cart', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // Checking if cart already exist for a user or not:
        const alreadyCart = await Cart.findOne({userId: req.user.id})

        // if cart already exist:
        if(alreadyCart)
        {
            // Modify the cart by changing the quantity or by adding new products into it:

            // if cart already exist then check if a product already exist in the cart or not:
            const alreadyProduct = Cart.cartItems.find((cartItems) => cartItems.productId === req.body.cartItems.productId);
            
            // if that product already in cart, then update its quantity:
            if(alreadyProduct)
            {
                // "cartitems.productId" is way to acces a key in a document object: Here searching for a user and a product
                const updateCart = await Cart.findOneAndUpdate({userId: req.user.id, "cartItems.productId": req.body.cartItems.productId}, {
                    "$set": {
                        "cartItems": {
                            ...req.body.cartItems,
                            quantity: alreadyProduct.quantity + req.body.cartItems.quantity
                        }
                    }
                })
            }

            // if not in cart then add in cart:
            else
            {
                const updateCart = await Cart.findOneAndUpdate({ userId: req.user.id }, { // first one is condition to find and second is all the stuff that you want to update
                    "$push": { // to change/push values into the document
                        "cartItems": req.body.cartItems
                    }
                })
            }

            res.status(200).json({updateCart})
        }

        // if cart doest not exist then create it:
        else 
        {
            const cart = await new Cart({
                userId: req.user.id, // coming from fetchuser middleware
                cartItems: [req.body.cartItems] // make it an array as in request it is in the form of an object:
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
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
});



module.exports = router;