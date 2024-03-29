const jwt = require('jsonwebtoken');

const Secret_Key = process.env.SECRET_KEY

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    const clearToken = true;
    if (!token) {
        res.status(401).json({ error: "Authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, Secret_Key);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(200).json({ clearToken, error: "Authenticate using a valid token" });
    }
}
module.exports = fetchuser;