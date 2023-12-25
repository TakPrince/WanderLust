const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listings.js")
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
    .get(wrapAsync(listingController.index))//index route
    .post(isLoggedIn,
        upload.single(`Listing[image]`),
        wrapAsync(listingController.createListing)
    );//create route 

router.get("/new", isLoggedIn, listingController.renderNewForm);//new route

router.get("/searchListing",isLoggedIn, wrapAsync(listingController.searchListing))//search route

router.route("/:id")
    .get(wrapAsync(listingController.showListing))//show route
    .put(isLoggedIn, isOwner,upload.single(`Listing[image]`), wrapAsync(listingController.updateListing))//update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deletListing));//delete route

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;