const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ a: 23,b:46 });
});
module.exports = router;