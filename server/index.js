const express=require('express');
const mongoose=require('mongoose')
const app=express();
const cors=require("cors");
require('dotenv').config();
const User=require('./models/user')
const cookieParser=require('cookie-parser')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const imgdown=require("image-downloader");
const multer=require('multer');
const fs=require('fs');
const Place=require("./models/Places");
const Booking=require("./models/Booking");

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use('/uploads',express.static(__dirname+'/uploads'))

const secret=bcrypt.genSaltSync(8);

mongoose.connect(process.env.murl).then(()=>{
    console.log("Database connected...");
}).catch((err)=>{
    console.log(err)
})

app.post("/login",async(req,res)=>{
    try{
        const {mail,pswd}=req.body;
        const userDoc=await User.findOne({mail})

        if(userDoc){
            const passCheck=bcrypt.compareSync(pswd,userDoc.pswd)
            if(passCheck){
                jwt.sign({
                    mail:userDoc.mail,
                    id:userDoc._id
                },process.env.jwtsecret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token,{
                        httpOnly:true,
                        sameSite: 'none',
                        secure: true
                    }).json(userDoc)
                })
            }else{
                res.json("pass not ok")
            }
        }else{
            res.json("user not found")
        }
    }catch(err){
        res.json(err);
    }
})

app.post("/register",async(req,res)=>{
    try{
        const data={
            name:req.body.name,
            mail:req.body.mail,
            pswd: bcrypt.hashSync(req.body.pswd,secret)
        }
        await User.create(data);
    }catch(err){
        res.status(422).json(err);
    }
})

app.get("/profile",(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,process.env.jwtsecret,{},async(err,userData)=>{
            if (err) throw err;
            const {name,mail,_id}=await User.findById(userData.id)
            res.json({name,mail,_id})
        })
    }
})

app.post("/logout",(req,res)=>{
    res.cookie("token","").json(true);
})

app.post("/uploadphoto-byLink",async(req,res)=>{
    const {link}=req.body;
    const newName="photo" + Date.now() + ".jpg";
    await imgdown.image({
        url:link,
        dest:__dirname+'/uploads/'+newName
    });
    res.json(newName);
})

const upload=multer({dest:'uploads/'})

app.post("/uploads",upload.array('photo',100),(req,res)=>{
    const upfiles=[];
    req.files.forEach(file => {
        const {path,originalname}=file;
        const orgparts=originalname.split(".");
        const ext=orgparts[orgparts.length-1];
        const newPath=path+"."+ext;
        fs.renameSync(path,newPath);
        upfiles.push(newPath.replace("uploads\\",""));
    });
    res.json(upfiles)
})

app.post("/places",(req,res)=>{
    const {token}=req.cookies;
    const {title,
        address,
        addedPhotos,
        desc,
        perks,
        einfo,
        cin,
        cout,
        maxg,
        price}=req.body;
    jwt.verify(token,process.env.jwtsecret,{},async(err,userData)=>{
        if (err) throw err;
        const placeInfo=await Place.create({
            owner:userData.id,
            title:title,
            address:address,
            photos:addedPhotos,
            description:desc,
            perks:perks,
            extraInfo:einfo,
            checkIn:cin,
            checkOut:cout,
            maxGuest:maxg,
            price:price
        })
        res.json(placeInfo);
    })
})

app.get("/user-places",(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,process.env.jwtsecret,{},async(err,userData)=>{
        const {id}=userData;
        res.json( await Place.find({owner:id}) );
    })
})

app.get("/places/:id",async(req,res)=>{
    const {id}=req.params;
    const placeDoc=await Place.findById(id);
    if(placeDoc){
        res.json(placeDoc);
    }else{
        res.json("place not found")
    }
})

app.put("/places",async(req,res)=>{
    const {token}=req.cookies;
    const {id,title,
        address,
        addedPhotos,
        desc,
        perks,
        einfo,
        cin,
        cout,
        maxg,
        price}=req.body;
        
        jwt.verify(token,process.env.jwtsecret,{},async(err,userData)=>{
            if (err) throw err;
            const placeDoc=await Place.findById(id);
            if(userData.id===placeDoc.owner.toString()){
                placeDoc.set({
                    title:title,
                    address:address,
                    photos:addedPhotos,
                    description:desc,
                    perks:perks,
                    extraInfo:einfo,
                    checkIn:cin,
                    checkOut:cout,
                    maxGuest:maxg,
                    price:price
                })
                await placeDoc.save();
                res.json("done")
            }
        })
})

app.get("/places",async(req,res)=>{
    res.json(await Place.find());
})

function getUserDataFromToken(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,process.env.jwtsecret,{},async(err,userData)=>{
            if (err) throw err;
            resolve(userData);
        })
    })
}

app.post("/booking",async(req,res)=>{
    const userData=await getUserDataFromToken(req)
    const {place,cin,cout,guest,name,number,price}=req.body;
    Booking.create({
        place:place,
        checkIn:cin,
        checkOut:cout,
        guest:guest,
        name:name,
        phone:number,
        price:price,
        user:userData.id,
    }).then((err,doc)=>{
        if (err) throw err;
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

app.get("/bookings",async(req,res)=>{
    getUserDataFromToken(req).then(async(data)=>{
        res.json(await Booking.find({user:data.id}).populate('place'));
    });
})

app.listen(5000,()=>{
    console.log("Server is listening...")
})