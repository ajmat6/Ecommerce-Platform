const express = require('express');
const router = express.Router(); // for routing
const jwt = require('jsonwebtoken'); // importing jwt for sending token to the user
const bcrypt = require('bcrypt') // importing brcrypt for password hashing
const User = require('../models/User'); // importing User model
const fetchuser = require('../middleware/fetchuser') // importing fetchuser middleware
const {body, validationResult} = require('express-validator'); // express validator for validation the user
const {validateSignupRequest, validateSigninRequest, isRequestValidated} = require('../validators/validate'); // importing validators
const shorid = require('shortid');
const shortid = require('shortid');

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

        // password hashing:
        const salt = await bcrypt.genSalt(10); // generating salt of 10 characters
        const hash_password = await bcrypt.hash(password, salt) // hashing password with generated salt
    
        const _user = await new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate() 
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

        const comparePassword = await bcrypt.compare(req.body.password, user.hash_password);

        if(!comparePassword)
        {
            return res.status(400).json({
                message: "Please enter valid credentials"
            })
        }


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

        // password hashing:
        const salt = await bcrypt.genSalt(10); // generating salt of 10 characters
        const hash_password = await bcrypt.hash(password, salt)
    
        const _user = await new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate(), // username generated through shortid library
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

        // sending cookie to the browser: (name of cookie , value of cookie, object which is taking cookie expiry time)
        res.cookie('token', authToken, {expiresIn: '1hr'});

        res.status(200).json({
            token: authToken,
            user: _user,
            message: "User Created Succesfully"
        })
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

        // password check:
        const comparePassword = await bcrypt.compare(req.body.password, user.hash_password);

        // if password are not equal:
        if(!comparePassword)
        {
            return res.status(400).json({
                message: "Please enter valid credentials"
            })
        }


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
    catch (error) {
        console.log(error.message); //method to print the error (error.message)
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})

// API end point to sign out an admin:
router.post('/admin/signout', async (req ,res) => {
    try
    {
       res.clearCookie('token') // clearing cookie named token
       res.status(200).json({
        message: "Sign Out Successfully"
       })
    }

    catch
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");
    }
})


// API end point to fetch an admin:
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