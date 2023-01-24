const mongoose = require("mongoose");


let connectMongoDb =()=>{ mongoose.connect("mongodb://localhost:27017/user").then((res)=>{
    console.log("Connected with Mongo DB successfully")
}).catch((err)=>{
    console.log("Error has occured")
})}

module.exports = connectMongoDb