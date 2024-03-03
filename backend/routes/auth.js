const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to fetch User details from auth-token
const fetchuser = require('../middleware/fetchUser')

const Secret_Key = process.env.SECRET_KEY


// ROUTE 1: creating user using POST (/routes/auth/createuser)
router.post('/createuser', [
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {

    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ success, errors: result.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).json({ success, error: "User already exists" });
        }

        // Hashing password
        let salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        // Creating user and pushing it to DB
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // Creating a payload for JWT
        const data = {
            user: {
                id: user._id
            }
        }
        success = true;
        const authToken = jwt.sign(data, Secret_Key);
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: authenticate a user using POST (/routes/auth/login)
router.post('/login', [
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {

    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ success, errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success, error: "Not a registered User" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(200).json({ success, error: "Email or Password is incorrect" });
        }

        // Creating a payload for JWT
        const data = {
            user: {
                id: user._id
            }
        }

        success = true;
        const authToken = jwt.sign(data, Secret_Key);
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get details of user through jwt-tokens (Login required)
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;