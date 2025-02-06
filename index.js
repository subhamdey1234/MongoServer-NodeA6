import mongoose from "mongoose";
import { type } from "os";
import express from "express";
const app=express();

//static folder
app.use(express.static("E:/m17jspider/Nodejs/Mongooseserver/public"));

//middlewares
app.use(express.json());



const url="mongodb://localhost:27017/mydatabase";
mongoose.connect(url).then(()=>{
    console.log("database connected successfully");
    
}).catch((err)=>{
    console.log(err);
    
})



const dataschema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    
    age: {
        type:Number,
        required:true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    ph_no:{
        type:Number,
     required:true
    },

    address:{
        city:String,
        zip:Number,
        state:String,
        country:String
    },

    gender:{
        type:String,enum:["Male","Female"]
    }

});

const modelschema=mongoose.model("Userdatasets",dataschema);



async function getdata() {
     const data=await modelschema.find();
console.log("user's data=>",data);

}
getdata();



app.get("/",(req,res)=>{
    res.sendFile("E:/m17jspider/Nodejs/Mongooseserver/pages/Home.html")
})

app.listen(3000,"localhost",()=>{
    console.log("http://localhost:3000");
    
})