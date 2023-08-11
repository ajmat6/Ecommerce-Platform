const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

    type: { // this is used to show different type of pages for different like displaying with price or just showcasing the products (like paid promotions)
        type: String
    },

    categoryImage: {
        type: String
    },

    parentId: { // To store the parent of the item. For eg Mobiles have electronics as their parent:
        type: String
    }
},

{timestamps: true}
)

module.exports = mongoose.model('Category', categorySchema);