const { required, date } = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

userSchema.plugin(passportLocalMongoose);

const User = new model('User', userSchema);
module.exports = User;