const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const review = require("./models/review.js");

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to Create Listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","You are not Authorized");
       return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You did not create this review");
       return res.redirect(`/listing/${id}`);
    }
    next();
}