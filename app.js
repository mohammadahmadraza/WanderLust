const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
// const cookies = require('cookies-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User.js');
const { listingRoutes, reviewRoutes, userRoutes } = require('./routes/index.js');

//URL to connect with wanderlust database
const MONGOOSEURL = 'mongodb://localhost:27017/wanderlust';

//Mandatory settings for the server
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodoverride('_method'));
app.engine('ejs', ejsMate);

// Function to connect with database
const main = async () => {
    await mongoose.connect(MONGOOSEURL);
}

main().then(res => console.log('Connected to database successfully.'))
    .catch(err => console.log('Error Occured While connectiing to database.'));

//Cookies option
const cookiesOption = {
    secret: 'wanderlustapp',
    resave: false,
    saveUninitialized: true,
    cookies: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}
//Middleware to set session ID for User & for flash messages
app.use(session(cookiesOption));
app.use(flash());

// Configutation for passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for handling flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    // console.log('req user', req.user);
    next();
});

// For Listing routes
app.use('/listings', listingRoutes);

//For Review Routes
app.use('/listings/:listing_id', reviewRoutes);

//For User Routes
app.use('/', userRoutes);

// To handle when user request for undefined routes
app.all('*', (req, res) => {
    res.render('error.ejs');
});

// Error handling middleware 
app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong.' } = err;
    res.status(statusCode).send(message);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});
