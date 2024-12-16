const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const sampleListings = require('./sampleData');
const MONGOOSEURL = 'mongodb://localhost:27017/wanderlust';

const main = async () => {
    await mongoose.connect(MONGOOSEURL);
}

main().then(res => console.log('Connected to database successfully.'))
    .catch(err => console.log('Error Occured.', err));

const insertSampleData = async () => {
    const Listings = sampleListings.data;
    await Listing.deleteMany({});
    await Listing.insertMany(Listings).then(() => console.log('Sample data inserted successfully.'))
        .catch((err) => {
            console.log('Error occured during insertion of sample data');
        });

}
insertSampleData();