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