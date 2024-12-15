const Listing = require('../models/Listing');

module.exports.showAllListingsController = async (req, res) => {
    const listings = await Listing.find();
    res.render('listing/show.ejs', { listings });
}

module.exports.addNewListingFormController = (req, res) => {
    res.render('listing/add.ejs');
}

module.exports.addNewListingController = async (req, res) => {
    let { title, description, imageURL, price, location, country } = req.body;

    const newListing = new Listing({
        title: title,
        description: description,
        imageURL: imageURL,
        price: price ? price : 0,
        location: location,
        country: country,
        created_by: res.locals.currUser._id
    });
    await newListing.save();
    req.flash('success', 'Listing has been added successfully.');
    res.redirect('/listings');
}

module.exports.editListingFormController = async (req, res) => {
    const listing = await Listing.findById(req.params.listing_id);
    res.render('listing/edit.ejs', { listing });
}

module.exports.editListingController = async (req, res) => {
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
    req.flash('success', 'Listing has been updated successfully.');
    res.redirect('/listings');
}

module.exports.viewListingDetailsController = async (req, res) => {
    const listing = await Listing.findById(req.params.listing_id).populate({
        path: 'reviews',
        populate: {
            path: 'reviewed_by'
        }
    }).populate('created_by');
    res.render('listing/view.ejs', { listing });
}

module.exports.deleteListingController = async (req, res) => {

    await Listing.findByIdAndDelete(req.params.listing_id)
        .then(() => {
            req.flash('success', 'Listing has been deleted successfully.');
            res.redirect('/listings');
        })
        .catch((err) => {
            res.send('Cannot delete due to error', err);
        })

}