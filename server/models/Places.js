const mongoose=require("mongoose");
const User=require("./user");

const PlaceSchema=new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:User},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuest: Number,
    price: Number
});

const placeModel=mongoose.model("place",PlaceSchema);
module.exports=placeModel;