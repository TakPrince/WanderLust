const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsyn.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const reviewController =require("../controllers/reviews.js")


router.post("/",
// validateReview,
isLoggedIn,
wrapAsync(reviewController.creatteReview));


//delet review
router.delete("/:reviewId",isReviewAuthor,isLoggedIn,wrapAsync(reviewController.deletReview));

module.exports = router;
