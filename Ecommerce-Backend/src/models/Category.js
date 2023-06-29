const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: { // slug is used to give an alternative name to a category if the name of the category entered is weird
        type: String,
        required: true,
        trim: true
    },

    parentId: { // To store the parent of the item. For eg Mobiles have electronics as their parent:
        type: String
    }
},

{timestamps: true}
)

exports.default = mongoose.model('Category', categorySchema);