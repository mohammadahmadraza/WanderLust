const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageURL: {
        type: String,
        default: "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
        set: (v) => v === "" ? "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : v
    },
    price: Number,
    location: String,
    country: String
});


const Listing = new model('Listing', listingSchema);
module.exports = Listing;