const mongoose=require('mongoose');

const Userschema=new mongoose.Schema({
    name: {type:String},
    mail: {type:String},
    pswd: {type:String}
},
{
    timestamps:true
})

const Usermodel=mongoose.model('User',Userschema);

module.exports=Usermodel;