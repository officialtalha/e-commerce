const Products = require('../models/productModel');
exports.productControllerPost = async (req, res) => {
    try {
        const { name, image, price } = req.body;

        const newProduct = new Products({ name, image, price });
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