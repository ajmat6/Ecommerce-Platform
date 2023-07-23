const express = require('express');
const router = express.Router(); // for routing
const jwt = require('jsonwebtoken'); // importing jwt for sending token to the user
const User = require('../models/User'); // importing User model
const fetchuser = require('../middleware/fetchuser') // importing fetchuser middleware
const {body, validationResult} = require('express-validator'); // express validator for validation the user
const {validateSignupRequest, validateSigninRequest, isRequestValidated} = require('../validators/validate'); // importing validators

// API end point for signup: POST Request -> to create an account:
router.post('/signup', validateSignupRequest, isRequestValidated, async (req,res) => { /// using validateRequest(array) and isRequestValidated as midddleware defined in validators folder
    
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

        //Token data that we want to send to the user (here id of the user)
        const data = {
            user:{
                id: _user._id,
                role: _user.role
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(201).json({authToken})
    }
    
    catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some time");
    }
})


// API end point for signin: POST Request -> to login
router.post('/signin', validateSigninRequest, isRequestValidated, async (req,res) => {

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
                // auth-token we are sending to the user:

                const data = {
                    user: {
                        id: user._id,
                        role: user.role // assigning role to validate in fetching the category
                    }
                }

                const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1hr'});

                // sending response to the user: Here fullName will be set by virtual
                const { firstName, lastName, email, role, fullname, _id} = user;

                res.status(200).json({
                    token,
                    user: {
                        firstName,
                        lastName,
                        email,
                        role,
                        fullname,
                        _id
                    }
                })

            }

            // if password not authenticated:
            else
            {
                return res.status(400).send("Incorrect Password!, Please try again");
            }
        }
    }
    catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})


// API end point for signin: POST Request -> to login
router.post('/profile', fetchuser, async (req, res) => {
    try
    {
        // finding user by its ID:
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    } 
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})


// Authentication for the admin:


// API end point for signup: POST Request -> to create an account:
router.post('/admin/signup', validateSignupRequest, isRequestValidated, async (req,res) => {
    
    // Finding the user:
    try
    {
        const alreadyUser = await User.findOne({email: req.body.email})
        
        // if user already exist then show this message:
        if(alreadyUser) return res.status(400).json({
            message: "Admin already exist"
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
            username: Math.random().toString(), // will generate the username randomly and then converting it to the string
            role: 'admin'
        })
    
        // Saving the document(a particular of the users collection) in the DB:
        _user.save();

        //Token data that we want to send to the user (here id of the user)
        const data = {
            user:{
                id: _user._id,
                role: _user.role
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(201).json({authToken})
    }
    
    catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }

})


// API end point for signin: POST Request -> to login
router.post('/admin/signin', validateSigninRequest, isRequestValidated, async (req,res) => {

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
            if(user.authenticate(req.body.password) && user.role === 'admin')
            {
                // auth-token we are sending to the user:

                const data = {
                    user: {
                        id: user._id,
                        role: user.role
                    }
                }

                const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1hr'});

                // sending response to the user: Here fullName will be set by virtual
                const { firstName, lastName, email, role, fullname, _id} = user;

                res.status(200).json({
                    token,
                    user: {
                        firstName,
                        lastName,
                        email,
                        role,
                        fullname,
                        _id
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
router.post('/admin/profile', fetchuser, async (req, res) => {
    try
    {
        // finding user by its ID:
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    } 
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

module.exports = router;