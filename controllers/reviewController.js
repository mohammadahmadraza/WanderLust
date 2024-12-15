const Review = require('../models/Review');
const Listing = require('../models/Listing');


module.exports.addReviewController = async (req, res) => {
    let listing = await Listing.findById(req.params.listing_id);
    let newReview = new Review({ ...req.body.review, reviewed_by: req.user._id });
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', 'Review has been added successfully.');
    res.redirect(`/listings/${req.params.listing_id}/view`);
}

module.exports.deleteReviewController = async (req, res) => {
    let { listing_id, review_id } = req.params;
    // console.log('Path : ', req.originalUrl);
    await Listing.findByIdAndUpdate(listing_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);

    req.flash('success', 'Review has been deleted successfully.');
    res.redirect(`/listings/${listing_id}/view`);
}