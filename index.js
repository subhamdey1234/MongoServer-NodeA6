import mongoose, { model } from "mongoose";
import { type } from "os";
import express from "express";
const app=express();

//static folder
app.use(express.static("E:/m17jspider/Nodejs/Mongooseserver/public"));

//middlewares                     //git remote add origin https://github.com/subhamdey1234/MongoServer-NodeA6.git
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

// const createData = async () => {
//     try {
//       const newData = new modelschema({
//         name: "Subham Dey",
//         age: 23,
//         email: "sdey06384@gmail.com",
//         ph_no: 9777837744,
//         address: {
//           city: "Umerkote",
//           zip: 764073,
//           state: "Odisha",
//           country: "IND"
//         },
//         gender: "Male"
//       });
  
//       const savedData = await newData.save();
//       console.log('Data successfully inserted:', savedData);
//     } catch (error) {
//       console.error('Error inserting data:', error.message);
//     } finally {
//       mongoose.connection.close();
//     }
//   };
  
//   // Call the function to insert the data
//   createData();




async function getdata() {
     const data=await modelschema.find();
console.log("user's data=>",data);

}
getdata();


//---Get all Data------------------------
app.get("/getdata",async (req,res)=>{
  try {
    const response=await modelschema.find();
    res.status(200).send(response);
  } 
  catch (error) {
    res.status(500).send(error);
    console.log(error);
    
  }
})
//--------------------------------------


//---Send Data to Database--------------------
app.post("/senddata",async(req,res)=>{
    try {
     const sentdata=req.body
     console.log(sentdata);
     
     const response=await modelschema.insertOne(sentdata);
          res.status(200).send(response);   
    } catch (error) {
        res.status(500).send(error)
        // console.log(error);
        
    }
})
//---------------------------------------------

//---PARAMS CONCEPT Updation---------------------------
app.post("/user/:name",async(req,res)=>{ 
try {
    const {name} =req.params;
    const data =req.body;
    const response=await modelschema.updateOne({name:name},{$set:{...data}});
    res.status(200).send(response);
} catch (error) {
    res.status(500).send(error)
}
})
//-----------------------------------------------

//-----Deletion------------------------------
app.delete("/deleteusers",async(req,res)=>{
    try {
        console.log(req.query);
        const data=req.query;
        const response=await modelschema.deleteOne({...data});
   res.status(200).send(response);
        
    } catch (error) {
        res.status(500).send(error);
    }
})
//------------------------------------------------

app.get("/",(req,res)=>{
    res.sendFile("E:/m17jspider/Nodejs/Mongooseserver/pages/Home.html")
})

app.listen(3000,"localhost",()=>{
    console.log("http://localhost:3000");
    
})