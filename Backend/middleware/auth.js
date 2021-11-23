const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, process.env.JWT_SECRET,);
        next();
    } catch {
        res.status(401).json({ error: error | 'Invalid request!' });
    }
};