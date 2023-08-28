const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    bannerImages: {
        img: {type: String},
        navigateTo: {type: String}
    },

    productImages: {
        img: {type: String},
        navigateTo: {type: String}
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},

{timestamps: true}
)

module.exports = mongoose.model('Page', pageSchema);