const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // to hash password

const UserSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, // removes the white space in the string if there is any
        min: 3, // min first name length
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true, // removes the white space in the string if there is any
        min: 3, // min first name length
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, // to make every username as unique
        index: true, // so that we can find username on the basis of their index
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contact: {
        type: String,
    },
    profilePicture: {
        type: String
    }
},

{timestamps: true} // timestamps tells mongoose to provide createdAt and updatedAt feature in your database
)

// Setting virtuals (which are not stored in MongoDB)
UserSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10); // first argument in hashSync is plainPassword and second is salt
})

// virtual to get fullname whenever it is called:
UserSchema.virtual('fullname')
.get(function(password) {
    return `${this.firstName} ${this.lastName}`
})

// method to authenticate the password:
UserSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password); // first argument is password that user will enter and the second is the hashed password that we had created above using salt. It will return either true or false based on the comparing
    }
}
 
module.exports = mongoose.model('User', UserSchema); // this will create a Users collection in the database