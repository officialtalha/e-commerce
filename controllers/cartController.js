const usersProducts = require('../models/user_product_junctionModel');
const Products = require('../models/productModel');
const mongoose = require('mongoose');
exports.cartControllerGet = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const pipeline = [
            { $match: { userId: userId } },
            { $project: { _id: 0, productId: 1 } }
        ];
        const allCartProdIds = await usersProducts.aggregate(pipeline);

        let allCartProducts = [];
        for (let prod in allCartProdIds) {
            const pipeline = [
                { $match: { _id: allCartProdIds[prod].productId } },
            ];
            const temp = await Products.aggregate(pipeline);
            allCartProducts.push(temp[0]);
        }
        res.status(200).json({ message: allCartProducts, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.cartControllerDeleteProd = async (req, res) => {
    try {
        const productId = new mongoose.Types.ObjectId(req.params.prodId);
        const userId = new mongoose.Types.ObjectId(req.user);

        const result = await usersProducts.deleteOne({ userId, productId });
        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};