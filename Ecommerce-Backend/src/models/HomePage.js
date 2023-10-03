const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    banners: [
        {img: {type: String},}
        // navigateTo: {type: String}
    ],
},

{timestamps: true}
)

module.exports = mongoose.model('Home', homeSchema);