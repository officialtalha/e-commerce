const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
exports.signUpControllerPOst = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //checking whether a user is already exist  
        const ifExist = await Users.find({ email });
        if (ifExist.length > 0) {
            return res.status(200).json({ message: 'user already exist', success: false });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                name: name,
                email: email,
                password: hash
            });
            const result = await newUser.save();
            return res.status(200).json({ message: 'signup successfull', success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
}