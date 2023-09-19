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
    },

    paymentType: {
        type: String,
        enum: ['cod', 'card'],
        required: true
    },

    orderStatus: [
        {
            type: {
                type: String,
                enum: ['ordered', 'packed', 'shipped', 'delivered'],
                default: 'ordered'
            },

            date: { // date will be available when required like when order is shipped
                type: Date,
            },

            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ]
    
},

{timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);