const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.loginControllerPOst = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ifExist = await Users.find({ email });
        if (ifExist.length > 0) {
            const ifMatched = await bcrypt.compare(password, ifExist[0].password);
            //checking whether a password is correct   
            if (ifMatched) {
                const userId = ifExist[0]._id;
                const token = jwt.sign({ userId }, process.env.JWT_SecretKey);
                return res.status(200).json({ message: 'login successfull', success: true, token, name: ifExist[0].name });
            } else {
                return res.status(200).json({ message: 'incorrect password', success: false });
            }
        } else {
            return res.status(200).json({ message: 'user does not exist', success: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
}