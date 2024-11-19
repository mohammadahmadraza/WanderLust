const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/Listing');
const WrapAsync = require('../utilis/WrapAsync');
const ExpressError = require('../utilis/ExpressError');
const {listingSchema} = require('../schema')


// Middleware function for schema validation

function listingValidation(req, res, next) {

    let { error } = listingSchema.validate(req.body);
    if (error) {
    console.log('Listing Validation Error', error);
        throw new ExpressError(400, 'Please send valid listing data.');
    }
    else {
        next();

    }

}

// Show all listing route
router.get('/', async (req, res) => {
    const listings = await Listing.find();
    res.render('listing/show.ejs', { listings });
});

// Form to add new listing
router.get('/addnew', (req, res) => {
    res.render('listing/add.ejs');
});

// Save new listing data to database
router.post('/addnew', listingValidation, WrapAsync(async (req, res) => {
    let { title, description, imageURL, price, location, country } = req.body;

    const newListing = new Listing({
        title: title,
        description: description,
        imageURL: imageURL,
        price: price ? price : 0,
        location: location,
        country: country
    });
    await newListing.save();
    res.redirect('/listings');
}));

// Form to edit listing
router.get('/:listing_id/edit', WrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.listing_id);
    res.render('listing/edit.ejs', { listing });
}));

// Save changes in edit listing
router.put('/:listing_id', listingValidation, WrapAsync(async (req, res) => {
    const { title, description, imageURL, price, location, country } = req.body;
    const updated_listing = {
        title: title,
        description: description,
        imageURL: imageURL,
        price: price ? price.replace(/,/g, '') : 0,
        location: location,
        country: country
    }
    const listing = await Listing.findByIdAndUpdate(req.params.listing_id, updated_listing, { runValidators: true });
    res.redirect('/listings');
}));

// View details of listing
router.get('/:listing_id/view', WrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.listing_id).populate('reviews');
    res.render('listing/view.ejs', { listing });
}));

// Delete listing from database
router.delete('/:listing_id', WrapAsync(async (req, res) => {

    await Listing.findByIdAndDelete(req.params.listing_id)
        .then(() => res.redirect('/listings'))
        .catch((err) => {
            res.send('Cannot delete due to error', err);
        })

}));



module.exports = router;


