const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.creatteReview =async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview  = new Review(req.body.review);
    newReview.author =req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();  
    req.flash("success", "New Review Add"); 
    res.redirect(`/listing/${listing._id}`)
}

module.exports.deletReview =async(req,res)=>{
    let {id,reviewId}= req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted"); 
    res.redirect(`/listing/${id}`);
}