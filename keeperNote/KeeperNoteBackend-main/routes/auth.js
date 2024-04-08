const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")
const JWT_Secret = process.env.JWT_SECRET;

//Route:1 Create a user using: POST "/api/auth/createuser". no login require
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    let sucess = false;
    // If there are errors, return Bad request & errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry user with this email already exists" })
        }

        // Hashing passsword using bcrypt 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }

        //creating jwt token
        const authtoken = jwt.sign(data, JWT_Secret);
        sucess = true;
        res.json({sucess, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route:2 Create a user using: POST "/api/auth/login". no login require
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be empty').exists(),
], async (req, res) => {
    let sucess = false;
    // If there are errors, return Bad request and errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    // Check whether the user with this email exists already
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        // comparing password using bcrypt
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({sucess, error: "Please try to login with correct credentials" })
        }
        //Here id is mapped with index so we are passing id, because info that is mapped
        //with index will be reterive faster then other info
        //Here we can pass any info in payload 
        const data = {
            user: {
                id: user.id
            }
        }

        //creating jwt token
        const authtoken = jwt.sign(data, JWT_Secret);
        sucess = true;
        res.json({sucess, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route:3 Get a user using: POST "/api/auth/getUser". login require
//fetchUser is a middelware which is called whenever login route will hit(request).  
router.post("/getUser", fetchUser, async (req, res) => {    
    try {
        const userId = req.user.id
        //Using -password to select each fileld except password 
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router