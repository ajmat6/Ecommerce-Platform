const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { userMiddleware } = require('../middleware/categoryMiddleware');

// function used to form promise array:
function  runUpdate(condition, updatedData)
{
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updatedData, {upsert: true})
        .then(result => resolve()) // sending resolved flag
        .catch(err => reject(err)); // rejected flag
    })
}

router.post('/user/cart/add-to-cart', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // Checking if cart already exist for a user or not:
        const alreadyCart = await Cart.findOne({userId: req.user.id})
        
        // if cart already exist:
        if(alreadyCart)
        {
            let promiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                // checking for each product in cart items:
                const productId = cartItem.productId;

                // checking if that product already present in the cart or not:
                const item = alreadyCart.cartItems.find(c => c.productId === productId);

                let condition, update;

                // if item already present in the cart:
                if(item)
                {
                    // condition to add an item into the cart if it is already present in the cart:
                    condition = {
                        "userId": req.user.id,
                        "cartItems.productId": productId
                    }

                    update = {
                        "$set": {
                            "cartItems.$": cartItem // updating a particular cartItem if already present in the cart:
                        }
                    }
                }

                // if item is new in the cart
                else
                {
                    condition = {
                        "userId": req.user.id
                    }

                    update = {
                        "$push": {
                            "cartItems": cartItem // pushing new cartItem into cartItems (see model)
                        }
                    }
                }

                // pushing into promise array for checking resolve and reject status of product:
                promiseArray.push(runUpdate(condition, update));
            });
            
            // resolving all the promises:
            Promise.all(promiseArray)
            .then(response => res.status(201).json({response}))
            .catch(error => res.status(400).json({error}));
            console.log(promiseArray)


            // // Modify the cart by changing the quantity or by adding new products into it:

            // // if cart already exist then check if a product already exist in the cart or not:
            // const alreadyProduct = alreadyCart.cartItems.find((cartItems) => cartItems.productId == req.body.cartItems.productId);
            
            // // if that product already in cart, then update its quantity:
            // if(alreadyProduct)
            // {
            //     // "cartitems.productId" is way to acces a key in a document object: Here searching for a user and a product
            //     const updateCart = await Cart.findOneAndUpdate({userId: req.user.id, "cartItems.productId": req.body.cartItems.productId}, {
            //         "$set": {
            //             "cartItems.$": { // when we have more than one product in cart and try to increase the quantity of one of them then the other products were getting lost. So to solve this problem use .$
            //                 ...req.body.cartItems,
            //                 quantity: alreadyProduct.quantity + req.body.cartItems.quantity
            //             }
            //         }
            //     })
            //     res.status(200).json({updateCart})
            // }
        }

        // if cart doest not exist then create it:
        else 
        {
            const cart = await new Cart({
                userId: req.user.id, // coming from fetchuser middleware
                cartItems: req.body.cartItems // carItems in req is already in the form of an array
            });
    
            cart.save()
            .then(() => {
                res.status(201).json({cart});
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

// endpoint to get cartItems of a user:
router.post('/user/cart/getCartItems', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // finding cart of the user:
        const cart = await Cart.findOne({userId: req.user.id}).populate('cartItems.productId', '_id name price productPic'); // populating productId in Modal's cartItems with id, name, price and productPic from Product Modal:
    
        // if cart of user exist exist then:
        if(cart)
        {
            // object which contains all the cart items of an user with an item's id as key:
            let cartItems =  {};

            // iterating through all the items in 'cart'
            cart.cartItems.forEach((item, index) => {
                // _id is populated at above
                cartItems[item.productId._id.toString()] = {
                    _id: item.productId._id.toString(),

                    // name, price, img are taken from product model as they might change and may not remain same after some time but quantity will remain as it is in your cart
                    name: item.productId.name,
                    price: item.productId.price,
                    img: item.productId.productPic[0].img,
                    quantity: item.quantity,
                }
            })

            res.status(200).json({cartItems});
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})

// endpoint to remove an item from the cart:
router.post('/user/cart/remove-item', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        const productId = req.body.productId;

        if(productId)
        {
            const updateCart = await Cart.updateOne({useId: req.user.id}, {
                $pull: {
                    cartItems: {
                        productId: productId
                    }
                }
            })

            res.status(202).json({updateCart});
        }

        else
        {
            return res.status(400).json({error: "Item not found"});
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})



module.exports = router;