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
app.use(methodoverride('__method'));
app.engine('ejs', ejsMate);


// function to connect with database and function call
const main = async () => {
    await mongoose.connect(MONGOOSEURL);
}

main().then(res => console.log('Connected to database successfully.'))
    .catch(err => console.log('Error Occured.', err));



// show all listing route
app.get('/listings', async (req, res) => {
    const listings = await Listing.find();
    res.render('listing/show.ejs', { listings });
});



















app.listen(8080, () => {
    console.log('Server is running on port 8080.');

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