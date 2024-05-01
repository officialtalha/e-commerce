const Products = require('../models/productModel');
const usersProducts = require('../models/user_product_junctionModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
exports.productControllerPost = async (req, res) => {
    try {
        const { name, image, price, description } = req.body;

        const newProduct = new Products({ name, image, price, description });
        const result = await newProduct.save();
        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.productControllerGet = async (req, res) => {
    try {
        const result = await Products.find();
        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.productControllerPostCart = async (req, res) => {
    try {
        const { token } = req.body;
        const prodId = req.params.prodId;

        const userInfo = jwt.verify(token, process.env.JWT_SecretKey);
        const userId = userInfo.userId;
        const newUsersProducts = new usersProducts({
            userId,
            productId: prodId
        });
        const result = await newUsersProducts.save();
        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.productControllerGetProdDetail = async (req, res) => {
    try {
        // const userId = new mongoose.Types.ObjectId(req.user);
        const prodId = new mongoose.Types.ObjectId(req.params.prodId);

        const prod = await Products.find({ _id: prodId });

        res.status(200).json({ message: prod, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};