const mongoose = require('mongoose')

const UserBetacartSchema = mongoose.Schema({
    souhait:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    attestation:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    lien:{
        type:String,
        required:true,
        unique:true
    },
    nom:{
        type:String,
        required:true
    },
    payement:{
        type:String,
        required:true
    },
    registre:{
        type:String,
        required:true,
        unique:true
    },
    social:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('UserBetacart', UserBetacartSchema)