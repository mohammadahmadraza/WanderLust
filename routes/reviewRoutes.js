const express = require('express');
const router = express.Router({ mergeParams: true });
const WrapAsync = require('../utilis/WrapAsync');
const { isUserLoggedIn, isReviewOwner } = require('../middleware');
const { addReviewController, deleteReviewController } = require('../controllers/reviewController');

// Save new review
router.post('/review', isUserLoggedIn, WrapAsync(addReviewController));

//Delete review from listing
router.delete('/view/review/:review_id', isUserLoggedIn, isReviewOwner, WrapAsync(deleteReviewController));

module.exports = router;