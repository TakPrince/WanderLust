const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const schema = mongoose.Schema;
const Review = require("./review.js")

const ListingSchema = new schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    image: {
        url: String,
        filename: String
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[
       {
        type: schema.Types.ObjectId,
        ref:"Review",
       } ,
    ],
    owner:{
        type: schema.Types.ObjectId,
        ref: "User",
    },
    
});


ListingSchema.post("findOneAndDelete", async (listing) => {       
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});



const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;