const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        max:64
    },
    email: {
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },

    password: { 
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date

});

module.exports = {
    UserSchema
};