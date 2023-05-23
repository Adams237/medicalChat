const mongoose = require('mongoose');

const UserSchea = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: ''
    },
    contacts:{
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
    },
    from: {
        type: String,
    },
    relationShip: {
        type: Number,
        enum: [1, 2, 3]
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('User', UserSchea);