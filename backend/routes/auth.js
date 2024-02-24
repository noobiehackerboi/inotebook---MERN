const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser')

const Secret_Key = process.env.SECRET_KEY


// ROUTE 1: creating user using POST (/routes/auth/createuser)
router.post('/createuser', [
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hashing password
        let salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        // Creating user and pushing it to db
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

        const authToken = jwt.sign(data, Secret_Key);
        // console.log(authToken);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

// ROUTE 2: authenticate a user using POST (/routes/auth/login)
router.post('/login', [
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Enter correct values" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({ error: "Enter correct values" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, Secret_Key);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// ROUTE 3: Get details of user through jwt-tokens (Login required)
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById( userId ).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
module.exports = router;