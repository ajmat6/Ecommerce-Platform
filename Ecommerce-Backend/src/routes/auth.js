const express = require('express');
const router = express.Router(); // for routing
const jwt = require('jsonwebtoken'); // importing jwt for sending token to the user
const User = require('../models/User'); // importing User model

// JWT Secret signature:
const JWT_SECRET = process.env.JWT_SECRET;

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

        // sending response to the user if user is created:
        const data = {
            user: _user
        }

        res.status(201).json(data)
    }catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }

})


// API end point for signin: POST Request -> to login
router.post('/signin', async (req,res) => {

    try
    {
        // Find user if exist:
        const user = await User.findOne({email: req.body.email});
    
        // if user not exist:
        if(!user)
        {
            return res.status(400).json({
                message: "Please enter valid credentials!"
            })
        }

        // if user exist:
        else
        {
            // calling authenticate method of User DB(checking for the password):
            if(user.authenticate(req.body.password))
            {
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1hr'});

                // sending response to the user: Here fullName will be set by virtual
                const { firstName, lastName, email, role, fullname } = user;

                res.status(200).json({
                    token,
                    user: {
                        firstName,
                        lastName,
                        email,
                        role,
                        fullname
                    }
                })

            }

            // if password not authenticated:
            else
            {
                return res.status(400).send("Incorrect Password!, Please try again");
            }
        }
    }catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})


// API end point for signin: POST Request -> to login
router.post('/profile', (req, res) => {
    res.status(200).json({
        user: 'profile'
    })
})

module.exports = router;