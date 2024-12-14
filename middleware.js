const Listing = require('./models/Listing');
const Review = require('./models/Review');

module.exports.isUserLoggedIn = (req, res, next) => {
    // console.log('originalURL', req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash('error', 'Please login first to access this.');
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectURL = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
}

module.exports.isListingOwner = async (req, res, next) => {

    let { listing_id } = req.params;
    let listing = await Listing.findById(listing_id);

    if (!listing.created_by.equals(res.locals.currUser._id)) {
        req.flash('error', "You don't have permission for this action.");
        return res.redirect(`/listings/${listing_id}/view`);
    }
    next();
}

module.exports.isReviewOwner = async (req, res, next) => {
    let review_id = req.params.review_id;
    let { reviewed_by } = await Review.findById(review_id);
    if (!reviewed_by.equals(res.locals.currUser._id)) {
        req.flash('error', 'You can only delete your reviews not others.');
        return res.redirect(`/listings/${req.params.listing_id}/view`);
    }
    next();
}