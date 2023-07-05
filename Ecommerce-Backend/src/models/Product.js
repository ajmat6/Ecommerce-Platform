const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: { // slug is used to store the slugify (to convert a string into a url)
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    quantity: {
        type: Number,
        required: true
    },

    offers: {
        type: Number
    },

    // product pictures is an array of pictures
    productPic: [
        { img: {type: String} }
    ],

    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User' // Using user Id as foreign key here from the User table
            },
            review: String
        }
    ],

    // Category of the product:
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },

    // For the admin as only admin can create a product:
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },

    updatedAt: Date
},

{timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);