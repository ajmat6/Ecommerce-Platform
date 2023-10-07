const mongoose = require('mongoose');

const homeTopicProductsSchema = mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomeTopicTitle',
        required: true
    },
    
    products: [
        {
            productName: {
                type: String,
                required: true,
                trim: true
            },

            categoryId: {
                type: mongoose.Types.ObjectId,
                ref: 'Category',
                required: true
            },

            productpic: {
                type: String,
                required: true
            },

            startingPrice: {
                type: Number,
                required: true
            }
        }
    ]
},

{timestamps: true}
)

module.exports = mongoose.model('HomeTopicProduct', homeTopicProductsSchema);