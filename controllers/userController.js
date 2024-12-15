const User = require('../models/User');

module.exports.signupFormController = (req, res) => {
    res.render('user/signup.ejs');
}

module.exports.signupController = async (req, res) => {
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
}

module.exports.loginFormController = (req, res) => {
    res.render('user/login.ejs');
}

module.exports.loginController = (req, res) => {
    // console.log('session after authentication', req.session);
    // console.log('res.locals.redirectURL ', res.locals.redirectURL);
    let returnTO = res.locals.redirectURL || '/listings';
    req.flash('success', 'User has been logged in successfully.');
    res.redirect(returnTO);
}

module.exports.logoutController = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully.');
        res.redirect('/listings');
    })
}