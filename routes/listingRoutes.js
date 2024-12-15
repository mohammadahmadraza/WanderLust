const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/Listing');
const WrapAsync = require('../utilis/WrapAsync');
const ExpressError = require('../utilis/ExpressError');
const { listingSchema } = require('../schema');
const { isUserLoggedIn, isListingOwner } = require('../middleware');
const { showAllListingsController, addNewListingFormController, addNewListingController,
    editListingFormController, editListingController, deleteListingController, viewListingDetailsController } = require('../controllers/listingController');

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
router.get('/', showAllListingsController);

// Form to add new listing
router.get('/addnew', isUserLoggedIn, addNewListingFormController);

// Save new listing data to database
router.post('/addnew', listingValidation, isUserLoggedIn, WrapAsync(addNewListingController));

// Form to edit listing
router.get('/:listing_id/edit', isUserLoggedIn, isListingOwner, WrapAsync(editListingFormController));

// Save changes in edit listing
router.put('/:listing_id', listingValidation, isUserLoggedIn, isListingOwner, WrapAsync(editListingController));

// View details of listing
router.get('/:listing_id/view', WrapAsync(viewListingDetailsController));

// Delete listing from database
router.delete('/:listing_id', isUserLoggedIn, isListingOwner, WrapAsync(deleteListingController));

module.exports = router;


