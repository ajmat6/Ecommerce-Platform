const express = require('express');
const router = express.Router(); // for routing
const User = require('../models/User'); // importing User model

// API end point for signin: POST Request -> to login
router.post('/signin', (req,res) => {

})

// API end point for signup: POST Request -> to create an account:
router.post('/signup', async (req,res) => {
    
    // Finding the user:
    try
    {
        const alreadyUser = await User.findOne({email: req.body.email})
        
        // if user already exist then show this message:
        if(alreadyUser) return res.status(400).json({
            message: "User already exist"
        })
    
        // if user is not present then create its account:
    
        // Destructuring and extracting elements from the req.body:
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
    
        const _user = await new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString() // will generate the username randomly and then converting it to the string
        })
    
        // Saving the document(a particular of the users collection) in the DB:
        _user.save();

        const data = {
            user: _user
        }

        res.status(201).json(data)
    }catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }

})

module.exports = router;