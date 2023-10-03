const mongoose = require('mongoose');

const hometopicNameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
})

const homeTopicSchema = mongoose.Schema({
    title: hometopicNameSchema,
    
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

            startingPrice: {
                type: Number,
                required: true
            }
        }
    ]
},

{timestamps: true}
)

module.exports = mongoose.model('HomeTopic', homeTopicSchema);