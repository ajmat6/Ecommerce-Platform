const mongoose = require('mongoose');

const homeTopicTitleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    slug: { // slug is used to store the slugify (to convert a string into a url)
        type: String,
        required: true,
        trim: true
    },
},

{timestamps: true}
)

module.exports = mongoose.model('HomeTopicTitle', homeTopicTitleSchema);