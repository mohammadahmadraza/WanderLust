const express = require('express');
const router = express.Router({ mergeParams: true });


// Form to add new listing
router.get('/addnew', (req, res) => {
// res.send('Form to add new listing');
    res.render('listing/add.ejs');
});


module.exports = router;


