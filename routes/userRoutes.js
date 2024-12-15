const express = require('express');
const router = express.Router();
const WrapAsync = require('../utilis/WrapAsync');
const passport = require('passport');
const { saveRedirectURL } = require('../middleware');
const { signupFormController, signupController, loginFormController, 
    loginController, logoutController } = require('../controllers/userController');

// Form for user sign up
router.get('/signup', signupFormController);

//Register user
router.post('/signup', WrapAsync(signupController));

// Form for user sign up
router.get('/login', loginFormController);

// Authenticate user for login
router.post('/login',
    saveRedirectURL,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, failureMessage: 'Username or password is not correct.' }),
    loginController);

// Logout User
router.get('/logout', logoutController)

module.exports = router;