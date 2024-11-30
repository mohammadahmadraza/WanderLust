const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/Listing');
const Review = require('../models/Review');
const WrapAsync = require('../utilis/WrapAsync');

// Reviews End points 
// Save new review
router.post('/review', WrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.listing_id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', 'Review has been added successfully.');
    res.redirect(`/listings/${req.params.listing_id}/view`);
}));

//Delete review from listing
router.delete('/view/review/:review_id', WrapAsync(async (req, res) => {
    let { listing_id, review_id } = req.params;
    await Listing.findByIdAndUpdate(listing_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);

    req.flash('success', 'Review has been deleted successfully.');

    res.redirect(`/listings/${listing_id}/view`);
}));


module.exports = router;