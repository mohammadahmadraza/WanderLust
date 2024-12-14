const { ref, required } = require("joi");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    reviewed_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Review = new model('Review', reviewSchema);

module.exports = Review;