const express = require('express');
const router = express.Router();
const User = require('../models/User');
const WrapAsync = require('../utilis/WrapAsync');
const passport = require('passport');
const { saveRedirectURL } = require('../middleware');

// Form for user sign up
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs');
});

//Register user
router.post('/signup', WrapAsync(async (req, res) => {
    const { fullname, username, email, password } = req.body;
    const newUser = new User({ fullname, username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if (err) {
            next(err);
        }
        req.flash('success', 'Welcome to wanderlust!');
        res.redirect('/listings');
    })
    // req.flash('success', 'User has been registered successfully.');
    // res.redirect('/listings');
}));

// Form for user sign up
router.get('/login', (req, res) => {
    res.render('user/login.ejs');
});

// Authenticate user for login
router.post('/login',
    saveRedirectURL,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, failureMessage: 'Username or password is not correct.' }),
    (req, res) => {
        // console.log('session after authentication', req.session);
        // console.log('res.locals.redirectURL ', res.locals.redirectURL);
        let returnTO = res.locals.redirectURL || '/listings';
        req.flash('success', 'User has been logged in successfully.');
        res.redirect(returnTO);
    });

// Logout User
router.get('/logout', async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully.');
        res.redirect('/listings');
    })
})

module.exports = router;