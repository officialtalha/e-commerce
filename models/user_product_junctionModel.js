const mongoose = require('mongoose');

const userProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
});

module.exports = mongoose.model('userProductAssociations', userProductSchema);