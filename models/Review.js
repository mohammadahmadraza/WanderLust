const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String
});

const Review = new model('Review', reviewSchema);

module.exports = Review;