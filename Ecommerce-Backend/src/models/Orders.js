const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAddress.address',
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            payablePrice: {
                type: Number,
                required: true
            },

            purchasedQuantity: {
                type: Number,
                required: true
            }
        }
    ],

    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'refund'],
        required: true
    }
    
},

{timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);