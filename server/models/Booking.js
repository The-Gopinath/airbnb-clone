const mongoose=require('mongoose');
const Place=require('./Places');
const User=require('./user');
const bookingSchema=new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:Place},
    user: {type:mongoose.Schema.Types.ObjectId, required:true, ref:User},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    guest: {type:Number, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number
})

const BookingModel=mongoose.model("Booking",bookingSchema);

module.exports=BookingModel;