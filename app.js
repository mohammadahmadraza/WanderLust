const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/Listing');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');


//URl to connect with wanderlust database
const MONGOOSEURL = 'mongodb://localhost:27017/wanderlust';

//compulsory settings for the server
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodoverride('_method'));
app.engine('ejs', ejsMate);


// function to connect with database and function call
const main = async () => {
    await mongoose.connect(MONGOOSEURL);
}

main().then(res => console.log('Connected to database successfully.'))
    .catch(err => console.log('Error Occured.', err));


// Show all listing route
app.get('/listings', async (req, res) => {
    const listings = await Listing.find();
    res.render('listing/show.ejs', { listings });
});

app.get('/', async (req, res) => {
    const listings = await Listing.find();
    res.render('listing/show.ejs', { listings });
});


// Form to add new listing
app.get('/listings/addnew', async (req, res) => {
    // const listings = await Listing.find();
    res.render('listing/add.ejs');
});

// Save new listing data to database
app.post('/listings/addnew', async (req, res) => {
    let { title, description, imageURL, price, location, country } = req.body;

    const newListing = new Listing({
        title: title,
        description: description,
        imageURL: imageURL,
        price: price,
        location: location,
        country: country
    });
    await newListing.save();
    res.redirect('/listings');
});

// Form to edit listing
app.get('/listings/:listing_id/edit', async (req, res) => {
    const listing = await Listing.findById(req.params.listing_id);
    res.render('listing/edit.ejs', { listing });
});

// Save changes in edit listing
app.put('/listings/:listing_id', async (req, res) => {
    const { title, description, imageURL, price, location, country } = req.body;
    const updated_listing = {
        title: title,
        description: description,
        imageURL: imageURL,
        price: price.replace(/,/g, ''),
        location: location,
        country: country
    }
    const listing = await Listing.findByIdAndUpdate(req.params.listing_id, updated_listing, { runValidators: true });
    res.redirect('/listings');
});

// View details of listing
app.get('/listings/:listing_id/view', async (req, res) => {
    const listing = await Listing.findById(req.params.listing_id);
    res.render('listing/view.ejs', { listing });
});

// Delete listing from database
app.delete('/listings/:listing_id', async (req, res) => {

    await Listing.findByIdAndDelete(req.params.listing_id)
        .then(() => res.redirect('/listings'))
        .catch((err) => {
            res.send('Cannot delete due to error', err);
        })

})















app.listen(8000, () => {
    console.log('Server is running on port 8000.');

})



















// const newListing = new Listing({

//     title: "Secluded Beach House in Costa Rica",
//     description:
//         "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
//     image: {
//         filename: "listingimage",
//         url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     },
//     price: 1800,
//     location: "Costa Rica",
//     country: "Costa Rica",

// });
// await newListing.save();