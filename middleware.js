const isUserLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login first to access this.');
        res.redirect('/login');
    }
    next();
}


module.exports = isUserLoggedIn;