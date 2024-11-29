const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

const User = new model('User', userSchema);
module.exports = User;