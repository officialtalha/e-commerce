const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const userInfo = jwt.verify(token, process.env.JWT_SecretKey);
        req.user = userInfo.userId;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};