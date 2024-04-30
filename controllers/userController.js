const User = require('../models/userModel');
exports.userControllerGet = async (req, res) => {
    try {
        const userId = req.user;
        const result = await User.findOne({ _id: userId });
        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};