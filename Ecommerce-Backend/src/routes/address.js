const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser'); // to check for signed in or not
const { userMiddleware } = require('../middleware/categoryMiddleware');
const Address = require('../models/Address');

router.post('/user/address/create', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        // payload is object that contains all the values defined in Address model
        const { payload } = req.body;
    
        // if address exist in payload:
        if(payload.address)
        {
            // is a address already exist and request is for editing the address:
            if(payload.address._id)
            {
                // find address by user and address id and then set it to payload address:
                const addAddress = await Address.findOneAndUpdate({user: req.user.id, "address._id": payload.address._id}, {
                    "$set": {
                        "address.$": payload.address
                    }
                })

                return res.status(201).json({addAddress})
            }

            else
            {
                // if address is new address, finding specific user by id and adding another address in it:
                const addAddress = await Address.findOneAndUpdate({user: req.user.id}, {
                    "$push": {
                        "address": payload.address
                    }
                }, {new: true, upsert: true})
    
                return res.status(201).json({addAddress});
            }
        }

        else
        {
            return res.status(400).json({error: "Params required in address"})
        }
    }
    catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})

router.get('/user/getaddress', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        const userAddress = await Address.findOne({user: req.user.id})
        if(userAddress)
        {
            return res.status(200).json({userAddress});
        }
    }
    catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})

module.exports = router;